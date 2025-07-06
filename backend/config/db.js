import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
const connectDB = async ()=> {
    try {
        mongoose.connection.on('connected', ()=>{ console.log("Database is Connected")});
        await mongoose.connect(`${process.env.MONGODB_URI}/expensetracker`)
    }catch (error){
        console.log(error.message);
    }
}

export default connectDB;
