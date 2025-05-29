

import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Load environment variables
dotenv.config({
  path: "./env",
});

console.log("🟢 index.js is running");

// Call DB connection function
connectDB(); // This will log success or error inside the function itself
