import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import { Message } from "@/models/userModel";
export async function POST(request:Request){
    await dbConnect()
    const {username,content}=await request.json()
    try{
        const user=await userModel.findOne({username})
        if(!user){
            return Response.json({
                success:false,
                message:"user not authenticated"
    
            },{status:400})
            
        }
        if(!user.isAcceptingmessage){
            return Response.json({
                success:false,
                message:"user not accepting the message"
    
            },{status:400})
        }
        const Newmessage={content,createdAt:new Date()}
        user.messages.push(Newmessage as Message)
        await user.save()
        return Response.json({
            success:true,
            message:"message sent successfully"
        },{status:200})
        

    }
    catch(error){
        console.log(error)
        return Response.json({
            success:false,
            message:"Error"

        },{status:400})
    }

}