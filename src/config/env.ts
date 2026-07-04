import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "3000",
  mongoUri: process.env.MONGODB_URI || "",

  authJwtSecret: process.env.JWT_SECRET || "dev-secret",
  authJwtTime: process.env.JWT_EXPIRES || "1h",

};