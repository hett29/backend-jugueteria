import mongoose from "mongoose";
import { env } from "../config/env";

export const connectDB = async () => {
  try {
    console.log("URI:", env.mongoUri);

    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:");
    console.error(error);
    process.exit(1);
  }
};