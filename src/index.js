
// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config({
  path: "./.env", //  .env file name
});

// Import the database connection function
import connectDB from "./db/index.js";

// Import the Express app instance
import { app } from "./app.js"; //  import app

// Log that index.js is active
console.log("🟢 index.js is running");

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    // Start the Express server on the specified port
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!", err);
  });
