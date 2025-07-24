const uri: string = process.env.DB || "mongodb://localhost:27017/mydatabase";

import { connect } from "mongoose";

// Function to connect to MongoDB
export const connectDB = async (): Promise<void> => {
    try {
        await connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};