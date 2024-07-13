import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request){
    await dbConnect()
    try{
        const{username,email,password}=await request.json()
        const existingUserisVerifiedbyUsername=await userModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserisVerifiedbyUsername){
            return {
                status:400,
                message:"Username already exists"
            }
        }
        const existingUserbyEmail=await userModel.findOne({
            email,
        })
        const verifycode=Math.floor(100000+Math.random()*900000).toString()
        if(existingUserbyEmail){
            if(existingUserbyEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"Email already exists"
                },{status:400})
            }
            else{
                const hashedPassword=await bcryptjs.hash(password,10)
                existingUserbyEmail.password=hashedPassword
                existingUserbyEmail.verifycode=verifycode
                existingUserbyEmail.verifycodeExpiry=new Date(Date.now()+3600000);
                await existingUserbyEmail.save()
            }

        }
        else{
            const hashedPassword=await bcryptjs.hash(password,10)
            //This is the expiry of the verify code
            const expiryDate=new Date()
            expiryDate.setHours(expiryDate.getHours()+1)
            console.log(expiryDate)
            const newUser=new userModel({
                username,
                email,
                password:hashedPassword,
                isVerified:false,
                verifycode,
                verifycodeExpiry:expiryDate,
                isAcceptingmessage:true,
                messages:[]
            })
            await newUser.save()
        }
        //sending the verification email
        const emailResponse=await sendVerificationEmail(
            email,
            username,
            verifycode,
        )
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message:emailResponse.message
            },{status:500})
        }
        return Response.json({
            success: true,
            message:"User registered successfully . Please verify your email"
        },{status:201})

    }
    catch(error){
        console.log("Error in registering the user",error)
        return Response.json({
            success:false,
            message:"Error in registering the user"
        },{status:400})
    }
}