import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    // 1. Verify the token
    const email = await verifyResetToken(token);

    if (!email) {
      return NextResponse.json(
        { error: "Invalid or expired reset link. Please request a new one." },
        { status: 401 }
      );
    }

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Update the user in the database
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Reset password error:", error);
    
    // Check if it's a Prisma record not found error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "No user found with this mobile number." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
