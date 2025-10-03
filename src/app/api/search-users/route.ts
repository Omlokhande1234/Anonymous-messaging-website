import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import mongoose from "mongoose";

export async function GET(request: Request) {
    try {
        await dbConnect();
        
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');
        
        console.log(`[SEARCH-USERS] Searching for: "${query}"`);
        
        if (!query || query.length < 2) {
            return Response.json({
                success: true,
                users: []
            }, { status: 200 });
        }

        // Search for users by username (case insensitive)
        // No authentication required for searching public usernames
        const users = await userModel.find({
            username: { $regex: query, $options: 'i' },
            isVerified: true,
            isAcceptingmessage: true
        })
        .select('username')
        .limit(10)
        .exec();

        console.log(`[SEARCH-USERS] Found ${users.length} users for query: "${query}"`);

        return Response.json({
            success: true,
            users: users.map(user => ({
                username: user.username
            }))
        }, { status: 200 });

    } catch (error) {
        console.error('[SEARCH-USERS] Error:', error);
        return Response.json({
            success: false,
            message: "Failed to search users"
        }, { status: 500 });
    }
}
