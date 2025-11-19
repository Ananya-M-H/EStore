import mongoose from "mongoose";

const connectDB  =async()=>{
    try{
        if (!process.env.MONGO_URI) {
            console.error('ERROR: MONGO_URI is not defined in .env file');
            process.exit(1);  // Exit if MONGO_URI is not set
          }
       await mongoose.connect(process.env.MONGO_URI);
       console.log("Successfully connected to mongoDB👍");
    }
    catch(error){
      console.log(`ERROR: ${error.message}`);
      process.exit(1);
        }
}

export default connectDB;
