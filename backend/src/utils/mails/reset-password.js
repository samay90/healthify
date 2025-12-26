const transporter = require("./transpoter");
require("dotenv").config();
const resetPassword = async (email,name,reset_link) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to: email,
            subject: "Reset your password",
            html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - Healthify</title>
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
              <h1 style="margin:0 0 20px; font-size:26px; color:#1a1a1a; font-weight:600;">Reset Your Password</h1>
              <p style="margin:0 0 24px; font-size:16px; color:#555555; line-height:1.6;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 24px; font-size:16px; color:#555555; line-height:1.6;">
                We received a request to reset your Healthify password.
              </p>
              <p style="margin:0 0 32px; font-size:16px; color:#555555; line-height:1.6;">
                Click the button below to set a new password.<br>
                <small style="color:#888888;">This link will expire in 10 minutes.</small>
              </p>

              <!-- Reset Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:32px auto;">
                <tr>
                  <td style="border-radius:8px; background-color:#7c3aed;">
                    <a href="${reset_link}" target="_blank" 
                       style="display:inline-block; padding:16px 48px; font-size:18px; color:#ffffff; text-decoration:none; font-weight:600;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0; font-size:14px; color:#777777;">
                If the button doesn't work, copy and paste this link:<br>
                <a href="${reset_link}" style="color:#7c3aed; word-break:break-all; text-decoration:none;">${reset_link}</a>
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

module.exports = resetPassword