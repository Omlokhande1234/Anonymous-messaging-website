import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
) : Promise<ApiResponse>{
    try {   
        console.log('[EMAIL] Attempting to send verification email to:', email);
        console.log('[EMAIL] Verify code:', verifyCode);
        
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mystrymsgs.vercel.app';
        
        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email HTML template
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verification Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(to right, #f9fafb, #f3f4f6); border-radius: 16px; padding: 40px; border: 1px solid #e5e7eb;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #000; margin: 0; font-size: 28px;">MysteryMsg</h1>
                </div>
                
                <h2 style="color: #000; margin-bottom: 20px;">Hello ${username},</h2>
                
                <p style="font-size: 16px; margin-bottom: 20px;">
                    Thank you for registering with MysteryMsg! Please use the following verification code to complete your registration:
                </p>
                
                <div style="background: white; border: 2px solid #000; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Your Verification Code</p>
                    <p style="font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 0; color: #000; font-family: 'Courier New', monospace;">
                        ${verifyCode}
                    </p>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
                    This code will expire in 1 hour.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${appUrl}/verify/${encodeURIComponent(username)}" 
                       style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px;">
                        Verify Your Account
                    </a>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                    If you did not request this code, please ignore this email.
                </p>
                
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                
                <p style="font-size: 12px; color: #999; text-align: center;">
                    © 2025 MysteryMsg. All rights reserved.
                </p>
            </div>
        </body>
        </html>
        `;

        // Send email
        const info = await transporter.sendMail({
            from: `"MysteryMsg" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'MysteryMsg - Verification Code',
            html: htmlContent,
            text: `Hello ${username},\n\nThank you for registering! Your verification code is: ${verifyCode}\n\nThis code will expire in 1 hour.\n\nVerify your account: ${appUrl}/verify/${encodeURIComponent(username)}\n\nIf you did not request this code, please ignore this email.`,
        });

        console.log('[EMAIL] Email sent successfully:', info.messageId);

        return {
            success: true,
            message:"Verification email sent successfully"
        }
        
    } catch (emailError) {
        console.error("[EMAIL] Error sending verification email:", emailError);
        return {
            success: false,
            message:"Failed to send verification email. Please try again."
        }
    }
}
