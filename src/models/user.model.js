// Importing required modules
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";       // For generating JWT tokens
import bcrypt from "bcrypt";           // For hashing and comparing passwords

// Define the user schema
const userSchema = new Schema({
    // Username field
    username: {
        type: String,
        required: true,       // Must be provided
        unique: true,         // Must be unique across users
        lowercase: true,      // Convert to lowercase automatically
        trim: true,           // Remove whitespace from start/end
        index: true           // Add index for faster search
    },

    // Email field
    email: {
        type: String,
        required: true,       // Must be provided
        unique: true,         // Must be unique across users
        lowercase: true,      // Convert to lowercase
        trim: true            // Remove whitespace
    },

    // Full name field
    fullName: {
        type: String,
        required: true,       // Must be provided
        trim: true,           // Remove whitespace
        index: true           // Add index for searchability
    },

    // Avatar field (Cloudinary URL)
    avatar: {
        type: String,         // Must be a string URL
        required: true        // Required to have a default avatar
    },

    // Cover image field (optional)
    coverImage: {
        type: String          // Optional Cloudinary URL
    },

    // Watch history field (array of ObjectIds referencing videos)
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"          // Reference to Video model
    }],

    // Password field (note: misspelled as "pasaword")
    password: {
        type: String,
        required: [true, "password is required"] // Required with custom error
    },

    // Refresh token field (for session/token management)
    refreshToken: {
        type: String
    }

}, {
    timestamps: true           // Automatically add createdAt and updatedAt fields
});

// Pre-save middleware to hash password before saving
userSchema.pre("save", async function (next) {
    // Only hash if password is modified or new
    if (!this.isModified("pasaword")) return next();

    // Hash the password with salt rounds = 10
    this.pasaword = await bcrypt.hash(this.pasaword, 10);
    next();
});

// Instance method to compare provided password with stored hashed password
userSchema.methods.isPasswordCorrect = async function (pasaword) {
    return await bcrypt.compare(pasaword, this.pasaword);
};

// Instance method to generate access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,            // Secret from .env
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Expiry duration from .env
        }
    );
};

// Instance method to generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this.id
        },
        process.env.REFRESH_TOKEN_SECRET,             // Secret from .env
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Expiry duration from .env
        }
    );
};

// Export the model based on the schema
export const User = mongoose.model("User", userSchema);
