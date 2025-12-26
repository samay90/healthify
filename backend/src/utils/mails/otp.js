const transporter = require("./transpoter");
require("dotenv").config();
const sendOtp = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: "Verification Code",
            html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Verification Code - Healthify</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f3ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f5f3ff; padding:20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding:0 30px; text-align:center; background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%);">
              <h2 style="margin:0; padding:24px 0; color:#ffffff; font-size:32px; font-weight:700;">Healthify</h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 40px; text-align:center;">
              <h1 style="margin:0 0 20px; font-size:26px; color:#1a1a1a; font-weight:600;">Verify Your Email</h1>
              <p style="margin:0 0 24px; font-size:16px; color:#555555; line-height:1.6;">
                Use the code below to verify your email address or complete your action.
              </p>

              <!-- OTP Code Box -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:32px auto;">
                <tr>
                  <td style="padding:20px 40px; background-color:#f3e8ff; border-radius:12px; font-size:36px; font-weight:700; letter-spacing:12px; color:#5b21b6; border:2px dashed #a78bfa;">
                    ${otp}
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0; font-size:15px; color:#666666;">
                This code will expire in <strong>10 minutes</strong>.<br>
                Never share this code with anyone.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:30px 40px; background-color:#f8f9fa; text-align:center; font-size:14px; color:#777777; border-top:1px solid #e5e5e5;">
              <p style="margin:0 0 12px;">
                Healthify – Your Journey to a Healthier You
              </p>
              <p style="margin:0 0 12px;">
                <a href="https://healthify.app" style="color:#7c3aed; text-decoration:none;">healthify.app</a> • 
                <a href="mailto:support@healthify.app" style="color:#7c3aed; text-decoration:none;">support@healthify.app</a>
              </p>
              <p style="margin:12px 0 0; color:#999999;">
                © 2025 Healthify. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = sendOtp