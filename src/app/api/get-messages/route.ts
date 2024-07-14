import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET (request:Request){
    await dbConnect();
    const session=await getServerSession(authOptions)
    const user:User=session?.user;
    if(!session||!session.user){
        return Response.json({
            success:false,
            message:"user is not authenticated"
        },{status:400})
    }
    const userId=new mongoose.Types.ObjectId(user._id)
    try{
        const user = await userModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } },
          ]).exec();
          if(!user||user.length==0){
            return Response.json({
                success:false,
                message:"user is not found"
            },{status:400})
          }
          return Response.json({
            success:false,
            message:user[0].messages
          },{status:200})
      

    }
    catch(error){
        console.log(error)
        return Response.json({
            success:false,
            message:"error"
            
        },{status:400})
    }
}