import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { mobile, otp, verificationId } = await req.json();
    const normalizedMobile = typeof mobile === 'string' ? mobile.trim() : '';

    if (!normalizedMobile || !otp || !verificationId) {
       return NextResponse.json(
        { error: 'Mobile number, OTP, and verification ID are required' },
        { status: 400 }
      );
    }

    // Verify OTP using MessageCentral
    const customerId = process.env.MESSAGE_CENTRAL_CUSTOMER_ID;
    const authToken = process.env.MESSAGE_CENTRAL_AUTH_TOKEN;

    if (customerId && authToken) {
      const countryCode = "91";
      const verifyResponse = await fetch(
        `https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=${countryCode}&mobileNumber=${normalizedMobile}&verificationId=${verificationId}&customerId=${customerId}&code=${otp}`,
        {
          method: "GET",
          headers: {
            "authToken": authToken,
          },
        }
      );
      
      const verifyData = await verifyResponse.json();
      
      if (!verifyResponse.ok || verifyData.responseCode !== 200) {
        return NextResponse.json(
          { error: 'Invalid OTP or OTP expired' },
          { status: 400 }
        );
      }
    } else {
      // Simulation mode
      if (otp !== "123456") {
         return NextResponse.json(
          { error: 'Invalid OTP (Simulation: Use 123456)' },
          { status: 400 }
        );
      }
    }

    // Set a secure HTTP-only cookie indicating this mobile number is verified
    // In production, this should ideally be signed/encrypted (e.g. JWT) to prevent tampering.
    const cookieStore = await cookies();
    cookieStore.set('verified_mobile', normalizedMobile, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 minutes to complete registration
      path: '/',
    });

    return NextResponse.json({
      message: 'Mobile number verified successfully',
      verified: true
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
