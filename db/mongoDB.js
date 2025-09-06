import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined in .env.<development/production>.local"
  );
}

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectToMongoDB;
