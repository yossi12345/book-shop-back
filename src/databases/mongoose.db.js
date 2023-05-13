const mongoose=require("mongoose")

const MONGODB_URL=process.env.MONGODB_URL;
const connectToMongoDB=async ()=>{
    try{
        await mongoose.connect(MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MongoDB database connected!")
    }catch (err){
        console.log("MongoDB database connection error!")
        process.exit(1)
    }
} 
const disconnectFromMongoDB=async ()=>{//לא עובד משום מה
    await mongoose.disconnect()
    console.log("MongoDB database disconnected successfully!")
}
module.exports={
    connectToMongoDB,
    disconnectFromMongoDB
}