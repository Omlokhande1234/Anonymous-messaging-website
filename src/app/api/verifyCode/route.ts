import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import { verifySchema } from "@/schemas/verifySchema";


export async function POST(request:Request){
    await dbConnect()
    try{
        const{username,code}=await request.json()
        const {success}=verifySchema.safeParse({code})
        if(!success){
            return Response.json({
                success:false,
                message:"Invalid input"
            }, {status:400})
        }
        const decodedUsername=decodeURIComponent(username)
        const user=await userModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            },{status:400})

        }
        const isVerifyCode=user.verifycode===code
        const isVerifyCodeExpiry=new Date(user.verifycodeExpiry)>new Date()
        if(!isVerifyCode){
            return Response.json({
                success:false,
                message:"Invalid code or the code has expired"
            },{status:400})
        }
        else if(!isVerifyCodeExpiry){
            return Response.json({
                success:false,
                message:"Code expired"
            })
        }
        else{
            user.isVerified=true
            await user.save()
            return Response.json({
            success:true,
            message:"User verified successfully"

            })
        }

    }
    catch(error){
        console.log(error)
        return Response.json({
            success:false,
            message:"Error"
        },{status:400})

    }

}
