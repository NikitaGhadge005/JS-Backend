
// Import the asyncHandler utility function from the '../utils/asyncHandlare' module.
// asyncHandler is typically a higher-order function that wraps your async route handler
// to automatically catch any errors and pass them to the Express error middleware.

// Import the asyncHandler utility to wrap async functions and handle errors centrally
import { asyncHandler } from "../utils/asyncHandlare.js";

// Import custom error class for structured API errors
import { ApiError } from "../utils/ApiError.js";

// Import the User model to interact with the user collection in the database
import { User } from "../models/user.model.js";

// Import Cloudinary uploader utility to handle image uploads
import { uplonCloudinary } from "../utils/cloudinary.js";

// Import ApiResponse class to standardize success responses
import { ApiResponse } from "../utils/Apiresponse.js";



// Define the registerUser controller function using asyncHandler for automatic error handling
const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullName, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uplonCloudinary(avatarLocalPath)
    const coverImage = await uplonCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

// Export the registerUser function so it can be used in route files
export { registerUser };








/* validation code for begginer

if(fullname==""){
 throw new ApiError(400,"All filed are required");  //chek one by one
}

*/

/*
const registerUser = asyncHandler(async (req, res) => {

  // At this point, you can access request data via req.body (e.g., name, email, password).
  // For now, we simply return a success response with HTTP status 200 and a JSON payload.


  return res.status(200).json({ message: "OK" });


});
*/
// Export the registerUser function as the default export of this module.
// Other files can then import this controller and assign it to a route, like:
//   router.post("/register", registerUser);
//export {registerUser} ;

