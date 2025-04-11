import * as nodemailer from 'nodemailer'
import { env } from '../lib/configs/env.config.js'
const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        from: `DevHubInternship program "${env.EMAIL_USER}"`, // Sender address
            to: email, // Recipient address
            subject: 'Verify Your Email', // Subject line
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                <h2>Welcome to Hackathon Website!</h2>
                <p>Dear User,</p>
                <p>Thank you for registering on our platform. Please use the following OTP to complete your registration:</p>
                <h3 style="background: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center;">
                  ${token}
                </h3>
                <p>If you did not register, please ignore this email.</p>
                <p>Best regards,<br>Hackathon Website Team</p>
              </div>
            `, 
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.EMAIL_USER,
            pass:env.EMAIL_PASS
        }
    })
    await transporter.sendMail(mailOptions)
}
export {sendVerificationEmail}