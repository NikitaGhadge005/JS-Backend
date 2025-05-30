// Import required modules
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // Plugin for pagination

// Define the video schema
const videoSchema = new Schema({

    // URL of the video file (e.g., Cloudinary link)
    videoFile: {
        type: String,
        required: true // Must be provided
    },

    // URL of the video thumbnail (e.g., Cloudinary link)
    thumbnail: {
        type: String,
        required: true
    },

    // Title of the video
    title: {
        type: String,
        required: true
    },

    // Description of the video
    descripton: {
        type: String,
        required: true
    },

    // Duration of the video in seconds (or minutes, depending on your logic)
    duration: {
        type: Number,
        required: true
    },

    // Number of views the video has
    View: {
        type: Number,
        default: 0 // Starts at 0 views
    },

    // Published status of the video
    isPublished: {
        type: Boolean,
        default: true
    },

    // Reference to the user who owns this video
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User" // Must reference the User model
    }

}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Apply pagination plugin for aggregation queries
videoSchema.plugin(mongooseAggregatePaginate);

// Export the Video model
export const Video = mongoose.model("Video", videoSchema);
