import { z } from "zod";
import userModel from "@/models/userModel";
import { usernameValidation } from "@/schemas/signUpSchema";
import dbConnect from "@/lib/dbConfig";

const usernameQuerySchema=z.object({
    username:usernameValidation
     
})
export async function GET(request:Request) {
    await dbConnect()
    try{
        const{searchParams}=new URL(request.url)
        //URL can be localhost/3000/api/auth/cpp?username=om
        const queryParams={
            username:searchParams.get('username')
        }
        //validate with zod
        const result=usernameQuerySchema.safeParse(queryParams)
        console.log(result)
        if(!result.success){
            //Here by using the format we will get all the errors and we dont want
            //that hence we take errors only of username
            const usernameErrors=result.error.format().username?._errors||[]
            return Response.json({
                success:false,
                message:usernameErrors.length>0
                ?usernameErrors.join( ', ')
                :'Invalid query parameters'
            },{status:400})

        }
        const {username}=result.data
        const existingVerifiedUser=await userModel.findOne({username,isVerified:true})
        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:'Username already taken'
            })
        }
        return Response.json({
            success:true,
            message:'Username is unique'
        })




    }
    catch(error){
        console.log("Error in checking username",error)
        return Response.json({
            success:false,
            message:"Error in checking username",
            error:error
        },{status:400})
    }
    
}