import  { Message } from '@/models/userModel'
export interface ApiResponse{
    success:boolean,
    message:string,
    //Here the accepting messages is made optional as in soe of the response there
    //is no message 
    isAcceptingMessages? : boolean,
    //Handling the multiple messages that are been collected and it is made optional
    //as we will not get multiple messages always
    messages?:Array<Message>
}