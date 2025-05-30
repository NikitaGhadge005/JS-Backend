// Import required libraries
import express from "express";           // Main Express framework
import cors from "cors";                 // To enable Cross-Origin Resource Sharing
import cookieParser from "cookie-parser"; // For parsing cookies from the client

// Initialize express app
const app = express();

// ===================== CORS Configuration ===================== //
app.use(cors({
    origin: process.env.CORS_ORIGIN,   // Allow requests only from this origin (defined in .env)
    credentials: true                  // Allow cookies and credentials to be sent
}));

// ===================== Express Middlewares ===================== //

// Parse incoming JSON requests with size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data (e.g., from forms), extended allows nested objects
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files like images, PDFs, etc. from the 'public' folder
app.use(express.static("public"));

// ===================== Cookie Parser ===================== //

// Enable cookie parsing so you can access cookies via req.cookies
app.use(cookieParser());

// ===================== Export App ===================== //
export { app };
