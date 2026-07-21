export async function sendWhatsAppWelcomeMessage(mobile: string, name: string) {
  try {
    const authKey = process.env.MSG91_AUTH_KEY;
    const integratedNumber = process.env.MSG91_WHATSAPP_NUMBER;
    const templateName = process.env.MSG91_WELCOME_TEMPLATE_NAME;

    if (!authKey || !integratedNumber || !templateName) {
      console.warn("MSG91 WhatsApp credentials are not set. Skipping WhatsApp message.");
      return;
    }

    // Format mobile number (ensure it includes country code, e.g., 91 for India if not provided)
    let formattedMobile = mobile.replace(/\D/g, '');
    if (formattedMobile.length === 10) {
      formattedMobile = `91${formattedMobile}`;
    }

    const payload = {
      "integrated-number": integratedNumber,
      "content-type": "template",
      "payload": {
        "messaging_product": "whatsapp",
        "type": "template",
        "template": {
          "name": templateName,
          "language": {
            "code": "en",
            "policy": "deterministic"
          },
          "to_and_components": [
            {
              "to": [
                formattedMobile
              ],
              "components": {
                "body_1": {
                  "type": "text",
                  "value": name
                }
              }
            }
          ]
        }
      }
    };

    const response = await fetch("https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/", {
      method: "POST",
      headers: {
        "authkey": authKey,
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("MSG91 WhatsApp API Error:", data);
    } else {
      console.log("MSG91 WhatsApp Welcome Message Sent:", data);
    }
    
    return data;
  } catch (error) {
    console.error("Failed to send WhatsApp message via MSG91:", error);
  }
}
