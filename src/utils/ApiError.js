
// Define a custom error class for API errors
class ApiError extends Error {
    constructor(
        statusCode,                        // HTTP status code (e.g., 404, 500)
        message = "Something Went Wrong",  // Default error message
        error = [],                        // Array to hold specific error details
        stack = ""                         // Optional custom stack trace
    ) {
        super(message); // Call the parent class (Error) constructor with message

        // Assign properties to the error instance
        this.statusCode = statusCode; // HTTP status code
        this.data = data; // Stores any additional data related to the error (optional and user-defined)
        this.message = message;       // Human-readable error message
        this.success = false;         // Set success to false for API consistency
        this.error = error;           // Any detailed error(s) if present

        // Use custom stack trace if provided, else capture automatically
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError }; // Export the custom error class
