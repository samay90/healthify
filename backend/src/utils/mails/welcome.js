const transporter = require("./transpoter");
require("dotenv").config();
const sendOtp = async (name,email, password,login_link) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: "Welcome Onboard. Account Credentials",
            html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Healthify!</title>
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
              <h1 style="margin:0 0 20px; font-size:28px; color:#1a1a1a; font-weight:600;">Welcome to Healthify!</h1>
              <p style="margin:0 0 24px; font-size:16px; color:#555555; line-height:1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 24px; font-size:16px; color:#555555; line-height:1.6;">
                We're thrilled to have you on board! Your journey to a healthier, happier you starts today.
              </p>
              <p style="margin:0 0 32px; font-size:16px; color:#555555; line-height:1.6;">
                You can log in to your account using your email and the temporary password we sent. 
                We recommend changing your password after your first login.
              </p>

              <!-- Credentials Box -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:24px auto; width:100%; max-width:400px;">
                <tr>
                  <td style="padding:20px; background-color:#f3e8ff; border-radius:12px; text-align:left; font-size:15px; color:#333333;">
                    <strong>Your Login Details:</strong><br><br>
                    <strong>Email:</strong> ${email}<br>
                    <strong>Temporary Password:</strong> ${password}
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:32px auto;">
                <tr>
                  <td style="border-radius:8px; background-color:#7c3aed;">
                    <a href="${login_link}" target="_blank" 
                       style="display:inline-block; padding:16px 48px; font-size:18px; color:#ffffff; text-decoration:none; font-weight:600;">
                      Update Account
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0; font-size:14px; color:#777777;">
                If the button doesn't work, copy and paste this link:<br>
                <a href="${login_link}" style="color:#7c3aed; word-break:break-all; text-decoration:none;">${login_link}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:30px 40px; background-color:#f8f9fa; text-align:center; font-size:14px; color:#777777; border-top:1px solid #e5e5e5;">
              <p style="margin:0 0 12px;">Healthify – Your Journey to a Healthier You</p>
              <p style="margin:0 0 12px;">
                <a href="https://healthify.app" style="color:#7c3aed; text-decoration:none;">healthify.app</a> • 
                <a href="mailto:support@healthify.app" style="color:#7c3aed; text-decoration:none;">support@healthify.app</a>
              </p>
              <p style="margin:12px 0 0; color:#999999;">© 2025 Healthify. All rights reserved.</p>
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