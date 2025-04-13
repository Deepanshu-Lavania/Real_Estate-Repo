import mongoose from "mongoose";


const connectDB =async()=>{
    const URI = process.env.MONGODB_URI
    try {
        if (URI) {
            await mongoose.connect(URI)
            console.log("DB connection succesfull! ");
        }else{
            console.log("URI is not available for connection with mongodb");
        }
    } catch (error) {
        console.log("mongodb connection error : ",error);
        throw error
    }
}
export {connectDB}