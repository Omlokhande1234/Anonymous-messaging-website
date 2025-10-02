import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";

export async function POST(request: Request) {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "User is not authenticated"
        }, { status: 401 });
    }

    const userId = session.user._id;
    
    if (!userId) {
        return Response.json({
            success: false,
            message: "User ID not found in session"
        }, { status: 400 });
    }

    try {
        const { acceptMessages } = await request.json();
        
        console.log("Toggling acceptMessages to:", acceptMessages);
        console.log("For user ID:", userId);

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { isAcceptingmessage: acceptMessages },
            { new: true }
        );

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        console.log("Updated user isAcceptingmessage:", updatedUser.isAcceptingmessage);

        return Response.json({
            success: true,
            message: "Message acceptance status updated successfully",
            isAcceptingmessage: updatedUser.isAcceptingmessage
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating user:", error);
        return Response.json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to update status"
        }, { status: 500 });
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 });
    }

    const userId = session.user._id;

    if (!userId) {
        return Response.json({
            success: false,
            message: "User ID not found in session"
        }, { status: 400 });
    }

    try {
        const foundUser = await userModel.findById(userId);

        if (!foundUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            isAcceptingmessage: foundUser.isAcceptingmessage
        }, { status: 200 });

    } catch (error) {
        console.error("Failed to get user status:", error);
        return Response.json({
            success: false,
            message: "Failed to get user status to accept messages"
        }, { status: 500 });
    }
}