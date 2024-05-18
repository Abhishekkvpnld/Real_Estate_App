import express from "express";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js";
import authRoute from './routes/authRoute.js';
import dotenv from "dotenv";


const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

 
app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);
 
app.get("/",(req,res)=>{ 
res.send("server running...")
});

app.listen(5000,()=>{
console.log("Server running on Port 5000...");
});