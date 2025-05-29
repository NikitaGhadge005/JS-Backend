
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB= async ()=>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`Mogoose Database connnected !! DB Host:${connectionInstance.connection.host}`);      
    }
    
    catch (error) {
        console.log("MONGOOSE DATABASE CONNECTION FAILD",error);
        process.exit(1)  
    }
}

export default connectDB





// import mongoose from "mongoose";
// import { DB_NAME } from "../constant.js";

// const connectDB= async()=>{
 
//     try {
        
//      const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//      console.log("Mogoose connection suceesfull");
     

//     } 
    
//     catch (error) {
//       console.log("Mongoose Connection Faile:",error);
//       process.exit(1)
        
//     }

// }


// export default connectDB()




















