import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";

export async function GET() {
    try {
        await dbConnect();
        
        // Get all verified users who accept messages
        const users = await userModel.find({
            isVerified: true,
            isAcceptingmessage: true
        })
        .select('username isVerified isAcceptingmessage')
        .limit(20)
        .exec();

        console.log(`[TEST-USERS] Found ${users.length} users`);

        return Response.json({
            success: true,
            count: users.length,
            users: users.map(user => ({
                username: user.username,
                isVerified: user.isVerified,
                isAcceptingmessage: user.isAcceptingmessage
            }))
        }, { status: 200 });

    } catch (error) {
        console.error('[TEST-USERS] Error:', error);
        return Response.json({
            success: false,
            message: "Failed to get users",
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
