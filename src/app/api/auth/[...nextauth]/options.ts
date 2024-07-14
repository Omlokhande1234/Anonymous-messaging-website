import {NextAuthOptions} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConfig";
import userModel from "@/models/userModel";
import { error } from "console";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials:{
                email:{label:'Email',type:'email'},
                password:{label:'Password',type:'password'},
            },
            async authorize(credentials:any,req):Promise<any>{
                await dbConnect()
                try{
                    const user=await userModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {password:credentials.identifier}
                           ]
                    })
                    if(!user){
                        throw new Error('No user found with this email');
                    }
                    if(!user.isVerified){
                        throw new Error('User not verified')
                    }
                    const passwordIsCorrect=bcrypt.compareSync(credentials.password
                        ,user.password
                    )
                    if(!passwordIsCorrect){
                        throw new Error('Password is incorrect')
                    }
                    return user
                }
                catch(error){
                    console.log(error)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token._id = user._id?.toString(); // Convert ObjectId to string
            token.isVerified = user.isVerified;
            token.isAcceptingMessages = user.isAcceptingMessages;
            token.username = user.username;
          }
          console.log(token)
          return token;
         
        },
        
        async session({ session, token }) {
          if (token) {
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            session.user.username = token.username;
          }
          return session;
        },
      },
     
      session: {
        strategy: 'jwt',
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: '/sign-in',
      },
      
}