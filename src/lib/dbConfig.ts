//Next js is edge time framework it don't work or runs all time continuously whenever the 
//request of the user comes into the picture then the things get executed while in
//pure backend if once the database is connected then that application keeps running
//continuously,the next js runs on time while the pure backend runs all time
//As our application is not running all time the database is not connected all time
//The connection takes place whenever the request is send by the user
//If we send the request immediately after the one request then we have to check before
//whether the database is connected if this check is not made then the db connection
//will be made again and again which is not good for the performance of the application
//or it will coke the server
//So we have to make sure that the db connection is made only once and it is not made
//again and again
import mongoose from "mongoose";

//This is custom data type
type ConnectionObject={
    //It is optional that is it can be connected or not connected and if it is connected
    //then it will return type is number
    isConnected?:number
}
const connection:ConnectionObject={}
//Here the void implies that I am least bothered of the return type i.e the return type
//can be anything
async function dbConnect():Promise<void> {
    //checking whether the database is already connected 
    if(connection.isConnected){
        //If the database is already connected then we don't need to connect again
        //So we will return from here
        console.log("Db is connected already")
        return;
    }
    //If the database is not connected then we will connect it
    try{
        const db=await mongoose.connect(process.env.MONGO_URL||'',{})
        //Here we have taken the readystate from db connections as our connection object
        //created above has return type number and ready state is number instead of number
        //we can also take boolean value
        console.log(db.connections)
        console.log("dbObject-",db.connections[0].readyState)
        connection.isConnected=db.connections[0].readyState
        console.log("Database connected successfully")
    }
    catch(error){
        console.log(`Connection to DB is failed.`);
        console.log(error);
        process.exit(1);
        
    }
    
}
export default dbConnect;