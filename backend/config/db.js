import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);


const connectDB =async ()=> {

    try{

        await mongoose.connect(process.env.MONGODB_URI)

       console.log(`DB CONNECTED SUCCESFULLY`)
    }catch(error){
        console.error(`ERROR: ${error}`)
        process.exit(1);


    }
}

export default connectDB