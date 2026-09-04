import { prisma } from '@/lib/prisma';

interface DeviceInfo {
    deviceId: string | null;
    ip: string;
    browser?: string | null;
    os?: string | null;
    deviceType?: string | null;
    deviceModel?: string | null;
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
                os: device.os,
                deviceModel: device.deviceModel
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
                os: device.os,
                deviceModel: device.deviceModel
            }
        });
    },

    handleDeviceTracking: async (user: { id: string, planType: string }, force: boolean, device: DeviceInfo) => {
        if (!device.deviceId) return null;

        const userId = user.id;
        const userDevices = await prisma.device.findMany({
            where: { userId }
        });
        
        const existingDevice = userDevices.find(d => d.deviceId === device.deviceId);
        
        if (userDevices.length > 0 && !existingDevice) {
            const isElite = user.planType.toLowerCase() === 'elit' || user.planType.toLowerCase() === 'elite';
            
            let shouldBlock = false;
            let activeDevice = userDevices[0];
            let deviceToDeleteWhere: any = null;

            if (isElite) {
                // Elite can have 1 Mobile and 1 Desktop
                const currentDeviceType = device.deviceType || 'Desktop';
                const conflictingDevice = userDevices.find(d => (d.deviceType || 'Desktop') === currentDeviceType);
                
                if (conflictingDevice) {
                    shouldBlock = true;
                    activeDevice = conflictingDevice;
                    deviceToDeleteWhere = { id: conflictingDevice.id };
                }
            } else {
                // Non-elite can only have 1 device total
                shouldBlock = true;
                deviceToDeleteWhere = { userId }; // delete all devices
            }

            if (shouldBlock) {
                if (force) {
                    await prisma.device.deleteMany({ where: deviceToDeleteWhere });
                } else {
                    await prisma.loginHistory.create({
                        data: { 
                            userId, 
                            deviceId: device.deviceId, 
                            ip: device.ip, 
                            status: "BLOCKED_DEVICE", 
                            browser: device.browser, 
                            os: device.os,
                            deviceModel: device.deviceModel
                        }
                    });
                    return {
                        error: 'ACTIVE_DEVICE',
                        activeDevice
                    };
                }
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
                    deviceModel: device.deviceModel,
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
