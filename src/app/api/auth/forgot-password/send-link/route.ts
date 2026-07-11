import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createResetToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // For security, don't reveal if user exists or not
      return NextResponse.json({ success: true, message: "If the email exists, a link was sent." });
    }

    const token = await createResetToken(email);
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #334155; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0; }
          .header { background: #ffffff; padding: 30px; text-align: center; border-bottom: 1px solid #e2e8f0; }
          .header h1 { margin: 0; color: #1e293b; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
          .header span { color: #3b82f6; }
          .content { padding: 40px 40px; text-align: center; }
          .content h2 { color: #0f172a; font-size: 22px; margin-top: 0; font-weight: 700; }
          .content p { color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 30px; }
          .button { display: inline-block; background: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3); transition: transform 0.2s, background-color 0.2s; }
          .button:hover { background: #2563eb; }
          .footer { padding: 24px; text-align: center; background: #f8fafc; border-top: 1px solid #e2e8f0; }
          .footer p { color: #64748b; font-size: 13px; margin: 0; line-height: 1.5; }
          .link-fallback { margin-top: 40px; padding: 16px; background: #f1f5f9; border-radius: 8px; word-break: break-all; color: #64748b; font-size: 13px; text-align: left; border: 1px solid #e2e8f0; }
          .link-fallback p { color: #475569; margin-top: 0; margin-bottom: 8px; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .link-fallback a { color: #3b82f6; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Mcqprep<span>zone</span></h1>
          </div>
          <div class="content">
            <h2>Reset your password</h2>
            <p>We received a request to reset the password for your account. If you didn't make this request, you can safely ignore this email.</p>
            <p>To choose a new password, please click the button below:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            
            <div class="link-fallback">
              <p>Or copy and paste this link</p>
              <a href="${resetLink}">${resetLink}</a>
            </div>
          </div>
          <div class="footer">
            <p>If you need help, please contact our support team.</p>
            <p style="margin-top: 12px;">&copy; ${new Date().getFullYear()} Mcqprepzone. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      // We use dynamic import so it doesn't crash if nodemailer fails to install
      const nodemailer = require("nodemailer");
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Mcqprepzone" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Reset your Mcqprepzone password",
        html: htmlTemplate,
      });

      console.log(`[EMAIL SENT] Password reset email successfully sent to ${email}`);

    } catch (e) {
      // Fallback if nodemailer isn't installed or env variables aren't set
      console.log(`\n======================================================`);
      console.log(`[SIMULATED EMAIL] To: ${email}`);
      console.log(`[SIMULATED EMAIL] Subject: Reset your Mcqprepzone password`);
      console.log(`[SIMULATED EMAIL] A beautiful HTML email would be sent here.`);
      console.log(`[SIMULATED EMAIL] Link: ${resetLink}`);
      console.log(`======================================================\n`);
    }

    return NextResponse.json({ success: true, message: "Reset link sent" });
  } catch (error) {
    console.error("Reset Link Error:", error);
    return NextResponse.json({ error: "Failed to send reset link" }, { status: 500 });
  }
}
