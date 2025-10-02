import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import { Message } from "@/models/userModel";
export async function POST(request:Request){
    try {
        await dbConnect()
        const {username,content}=await request.json()
        
        console.log('[SEND-MESSAGE] Sending message to:', username);
        console.log('[SEND-MESSAGE] Message content:', content);
        
        if(!username || !content){
            return Response.json({
                success:false,
                message:"Username and content are required"
            },{status:400})
        }
        
        const user=await userModel.findOne({username})
        if(!user){
            console.log('[SEND-MESSAGE] User not found:', username);
            return Response.json({
                success:false,
                message:"User not found"
            },{status:404})
        }
        
        if(!user.isAcceptingmessage){
            console.log('[SEND-MESSAGE] User not accepting messages:', username);
            return Response.json({
                success:false,
                message:"User is not accepting messages"
            },{status:400})
        }
        
        const Newmessage={content,createdAt:new Date()}
        user.messages.push(Newmessage as Message)
        
        console.log('[SEND-MESSAGE] Saving message for user:', username);
        await user.save()
        
        console.log('[SEND-MESSAGE] Message saved successfully');
        return Response.json({
            success:true,
            message:"Message sent successfully"
        },{status:200})

    }
    catch(error){
        console.error('[SEND-MESSAGE] Error:', error)
        return Response.json({
            success:false,
            message:"Internal server error"
        },{status:500})
    }
}