import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET (request:Request){
    try {
        await dbConnect();
        const session=await getServerSession(authOptions)
        console.log('[GET-MESSAGES] Session:', session);
        
        const user:User=session?.user;
        if(!session||!session.user){
            console.log('[GET-MESSAGES] No session or user found');
            return Response.json({
                success:false,
                message:"user is not authenticated"
            },{status:401})
        }
        
        const userId=new mongoose.Types.ObjectId(user._id)
        console.log('[GET-MESSAGES] User ID:', userId);
        
        const userData = await userModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } },
          ]).exec();
          
          console.log('[GET-MESSAGES] User data from DB:', userData);
          
          if(!userData||userData.length==0){
            console.log('[GET-MESSAGES] No user found in database');
            return Response.json({
                success:true,
                messages:[]
            },{status:200})
          }
          
          const messages = userData[0].messages || [];
          console.log('[GET-MESSAGES] Returning messages:', messages);
          
          return Response.json({
            success:true,
            messages: messages
          },{status:200})

    }
    catch(error){
        console.error('[GET-MESSAGES] Error:', error)
        return Response.json({
            success:false,
            message:"Internal server error"
        },{status:500})
    }
}