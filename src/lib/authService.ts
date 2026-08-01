import { prisma } from '@/lib/prisma';

interface DeviceInfo {
    deviceId: string | null;
    ip: string;
    browser?: string | null;
    os?: string | null;
    deviceType?: string | null;
    screen?: string | null;
    timezone?: string | null;
    language?: string | null;
}

export const authService = {
    logFailedAttempt: async (userId: string, device: DeviceInfo) => {
        await prisma.loginHistory.create({
            data: {
                userId,
                deviceId: device.deviceId,
                ip: device.ip,
                status: "FAILED",
                browser: device.browser,
                os: device.os
            }
        });
    },

    logSuccessfulAttempt: async (userId: string, device: DeviceInfo) => {
        await prisma.loginHistory.create({
            data: {
                userId,
                deviceId: device.deviceId,
                ip: device.ip,
                status: "SUCCESS",
                browser: device.browser,
                os: device.os
            }
        });
    },

    handleDeviceTracking: async (userId: string, force: boolean, device: DeviceInfo) => {
        if (!device.deviceId) return null;

        const userDevices = await prisma.device.findMany({
            where: { userId }
        });
        
        const existingDevice = userDevices.find(d => d.deviceId === device.deviceId);
        
        if (userDevices.length > 0 && !existingDevice) {
            if (force) {
                await prisma.device.deleteMany({ where: { userId } });
            } else {
                const activeDevice = userDevices[0];
                await prisma.loginHistory.create({
                    data: { 
                        userId, 
                        deviceId: device.deviceId, 
                        ip: device.ip, 
                        status: "BLOCKED_DEVICE", 
                        browser: device.browser, 
                        os: device.os 
                    }
                });
                return {
                    error: 'ACTIVE_DEVICE',
                    activeDevice
                };
            }
        }
        
        try {
            await prisma.device.upsert({
                where: { deviceId: device.deviceId },
                update: {
                    userId,
                    lastLogin: new Date(),
                    lastIp: device.ip,
                    browser: device.browser,
                    os: device.os
                },
                create: {
                    deviceId: device.deviceId,
                    userId,
                    browser: device.browser,
                    os: device.os,
                    deviceType: device.deviceType,
                    screen: device.screen,
                    timezone: device.timezone,
                    language: device.language,
                    lastIp: device.ip
                }
            });
        } catch (error: any) {
            if (error.code !== 'P2002') {
                console.error("Error upserting device:", error);
            }
        }

        return null;
    }
};
