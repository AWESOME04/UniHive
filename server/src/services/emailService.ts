import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE || 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

// Send OTP email
export const sendOTPEmail = async (email: string, name: string, otp: string) => {
  try {
    // If no email configuration, fall back to dev mode
    if (!EMAIL_USER || !EMAIL_PASSWORD) {
      console.log('==================================================');
      console.log(`📧 DEV MODE: Email would be sent to ${email}`);
      console.log(`👤 Recipient: ${name}`);
      console.log(`🔑 OTP Code: ${otp}`);
      console.log('==================================================');
      return true;
    }

    // Otherwise try to send a real email
    const mailOptions = {
      from: `"UniHive" <${EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your UniHive Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #4A154B;">Welcome to UniHive!</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering with UniHive. To verify your email address, please use the following OTP code:</p>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you did not request this verification, please ignore this email.</p>
          <p>Best regards,<br>The UniHive Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (email: string, name: string, token: string) => {
  try {
    const frontendUrl = process.env.FRONTEND_URL || 'https://unihive.vercel.app';
    const resetLink = `${frontendUrl}/reset-password?email=${encodeURIComponent(email)}&token=${token}`;
    
    // If no email configuration, fall back to dev mode
    if (!EMAIL_USER || !EMAIL_PASSWORD) {
      console.log('==================================================');
      console.log(`📧 DEV MODE: Password reset email would be sent to ${email}`);
      console.log(`👤 Recipient: ${name}`);
      console.log(`🔗 Reset Link: ${resetLink}`);
      console.log('==================================================');
      return true;
    }

    // Otherwise try to send a real email
    const mailOptions = {
      from: `"UniHive" <${EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your UniHive Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #4A154B;">Password Reset Request</h2>
          <p>Hello ${name},</p>
          <p>We received a request to reset your password. Click the button below to create a new password. This link will expire in 1 hour.</p>
          <div style="margin: 20px 0; text-align: center;">
            <a href="${resetLink}" style="background-color: #4A154B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          </div>
          <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
          <p>Best regards,<br>The UniHive Team</p>
          <p style="font-size: 12px; color: #666;">If the button doesn't work, copy and paste this link into your browser: ${resetLink}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};
