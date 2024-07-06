import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/email";
import { ApiResponse } from "@/types/ApiResponse";

//The api response is the return type, so here we have set the return type of the 
//function to be ApiResponse
export async function sendVerificationEmail(
    email: string,
    username:string,
    verifyCode:string
):Promise<ApiResponse> {
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystery message | Verification code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
          return{
            success:true,
            message:"Verification email send successfully"
          }
    }
    catch(error){
        console.log(error)
        return {
            success:false,
            message:"Error sending verification email"
        }
    }
    
}