import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import { User } from "next-auth";

export  async function POST(request:Request){
    await dbConnect();
    const session=await getServerSession(authOptions)
    const user:User=session?.user;
    if(!session||!session.user){
        return Response.json({
            success:false,
            message:"user is not authenticated"
        },{status:400})
    }
    const userId=user._id
    const{acceptMessages}=await request.json()
    try{
        const updatedUser=await userModel.findByIdAndUpdate(
            userId,
            {isAcceptingmessage:acceptMessages},
            {new:true}

        )
        if(!updatedUser){
            return Response.json({
                success:false,
                message:"user updation failed"
            },{status:400})
        }
        return Response.json({
            success:true,
            message:"user updation success and message acceptance status updated"
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
export async function GET(request:Request) {
    await dbConnect()

    const session=await getServerSession(authOptions)

    const user : User =session?.user  //🔥here we must get an error so don't ignore

    if (!session || !session.user ) {
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }

    const userId=user._id;

    try {
        const foundUser=await userModel.findById(userId)

        if(!foundUser){
            return Response.json({
                success:false,
                messages:"User not found"
            },{status:404})
        }

        return Response.json({
            success:true,
            isAcceptingMessage:foundUser.isAcceptingmessage
        },{status:200})


    } catch (error) {
        console.log(`failed to get user status to accept messages`)
        console.log(error)
        return Response.json({
            success:false,
            message:"Failed to get user status to accept messages"
        },
        {
            status:500
        })
    }
}
