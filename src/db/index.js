import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // USE BACKTICKS `` instead of single quotes ''
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        
        // USE BACKTICKS here too for the variable to show up
        console.log(`\n MongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}

export default connectDB;