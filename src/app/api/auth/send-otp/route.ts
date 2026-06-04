import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { mobile } = await req.json();

    if (!mobile) {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    const customerId = process.env.MESSAGE_CENTRAL_CUSTOMER_ID;
    const authToken = process.env.MESSAGE_CENTRAL_AUTH_TOKEN;

    if (!customerId || !authToken) {
      console.warn("MessageCentral credentials missing. Simulating OTP send for development.");
      // In development without credentials, we can simulate success.
      return NextResponse.json({
        message: "OTP sent successfully (Simulated)",
        verificationId: "simulated-verification-id-" + Date.now(),
      });
    }

    // Call MessageCentral API
    // Ensure mobile number has country code, assume India (+91) if not provided, or it should be passed from frontend
    // MessageCentral API expects mobile number usually without '+' but with countryCode parameter, depends on exact API version.
    // Example using standard MessageCentral API:
    const countryCode = "91"; // Default to India, can be made dynamic
    const response = await fetch(
      `https://cpaas.messagecentral.com/verification/v3/send?countryCode=${countryCode}&customerId=${customerId}&flowType=SMS&mobileNumber=${mobile}`,
      {
        method: "POST",
        headers: {
          "authToken": authToken,
        },
      }
    );

    const data = await response.json();

    if (response.ok && data.responseCode === 200) {
      return NextResponse.json({
        message: "OTP sent successfully",
        verificationId: data.data.verificationId,
      });
    } else {
      console.error("MessageCentral Send Error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send OTP" },
        { status: response.status || 500 }
      );
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
