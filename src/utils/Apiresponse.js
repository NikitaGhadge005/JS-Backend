// Define a standard format for API success responses
class ApiResponse {
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode;       // HTTP status code (e.g., 200, 201)
        this.data = data;                   // Actual response data (object, array, etc.)
        this.message = message;             // Optional success message
        this.success = statusCode < 400;    // Boolean indicating if the request was successful
    }
}

export { ApiResponse };