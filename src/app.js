// ===================== Import Required Libraries ===================== //

// Import the Express framework to create the server and define routes
import express from "express";

// Import CORS middleware to enable Cross-Origin Resource Sharing,
// which allows the server to accept requests from different domains/origins.
import cors from "cors";

// Import Cookie Parser middleware to parse cookies attached to client requests,
// making them available under req.cookies in route handlers.

import cookieParser from "cookie-parser";

// ===================== Initialize Express App ===================== //

// Create a new Express application instance

const app = express();

// ===================== CORS Configuration ===================== //

// Configure CORS to control which origins are allowed to access the server.
// Passing an options object to cors():

app.use(
  cors({

    // 'origin' specifies the allowed frontend URL(s). 
    // Read from environment variable CORS_ORIGIN (e.g., http://localhost:3000)

    origin: process.env.CORS_ORIGIN,
    
    // 'credentials: true' allows cookies, authorization headers, or TLS client certificates
    // to be included in cross-origin requests.

    credentials: true,
  })
);

// ===================== Express Middlewares ===================== //

// Parse incoming requests with JSON payloads.
// 'limit: "16kb"' prevents clients from sending request bodies larger than 16 kilobytes.

app.use(express.json({ limit: "16kb" }));

// Parse incoming requests with URL-encoded payloads (typically from HTML forms).
// 'extended: true' enables parsing nested objects (e.g., JSON-like payloads in forms).
// 'limit: "16kb"' prevents excessively large form submissions.

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files (images, CSS, JavaScript, etc.) from the 'public' directory.
// Any files placed in './public' will be accessible via http://<server>/<filename>.

app.use(express.static("public"));

// ===================== Cookie Parser ===================== //

// Enable cookie parsing so you can read and write cookies in your request handlers.
// After this middleware is applied, you can access cookies via req.cookies
// and signed cookies via req.signedCookies (if you set a secret).

app.use(cookieParser());

// ===================== Import Routes ===================== //

// Import the userRouter from the 'routes/user.routs.js' file.
// This router contains all endpoint definitions related to user operations,
// such as creating, reading, updating, and deleting users.

import userRouter from "./routes/user.routes.js"; // ✅ Correct filename and extension

app.use("/api/v1/users", userRouter); // ✅ Mounts route at /api/v1/users

// ===================== Export App ===================== //

// Export the configured Express app instance so it can be imported elsewhere.
// Typically, you will import this 'app' into a server startup file (e.g., index.js or server.js),
// where you call app.listen(...) to start listening for incoming requests.

//http://localhost:8000/api/v1/users/register

export { app };

