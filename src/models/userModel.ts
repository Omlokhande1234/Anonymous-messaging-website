import mongoose, { Mongoose,Schema,Document } from "mongoose";
//As this data would finally be in database in the form of document we extend it by document
//THis is our custom datatype
export interface Message extends Document {
    content:string,
    createdAt:Date
}
const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
})

export interface User extends Document{
    username:string,
    email:string,
    password:string,
    avatar:string,
    verifycode:string,
    verifycodeExpiry:Date,
    isAcceptingmessage:boolean,
    messages:Message[],
    isVerified:boolean
}
const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[8,"password must be at least 8 characters"]
    },
    avatar:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String,
        }
    },
    verifycode:{
        type:String,
        required:[true,"verifycode is required"],
    },
    verifycodeExpiry:{
        type:Date,
        required:[true,"verifycodeExpiry is required"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingmessage:{
        type:Boolean,
        default:true

    },
    messages:[MessageSchema]
})
//First we are checking if the model exists already 
//Here we are defining the return type as User 
const userModel= (mongoose.models.User as mongoose.Model<User>)||
                  mongoose.model<User>("User",UserSchema)
                  //Here also we have given type of the model
export default userModel
