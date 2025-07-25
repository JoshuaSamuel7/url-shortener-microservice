import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import urlRoutes from "./routes/urlRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";
import cors from"cors"
dotenv.config();
const app = express();
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true,
}))
app.use(express.json());
app.use(cookieParser())
app.use("/", urlRoutes);
app.use("/auth",authRoutes);

app.use("/test",(req,res)=>res.send("WOrking"));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
export default app;