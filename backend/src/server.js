import dotenv from "dotenv";
dotenv.config();
import path from "path";

import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";

import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();

// Configure CORS for both development and production
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));



 // Debugging line to check the value of MONGO_URI

const __dirname = path.resolve()

app.use(express.json());

app.use((req,res,next)=>{
    console.log(`Req method: ${req.method} & Req URL: ${req.url}`); // Debugging line to check incoming requests
    next();
})

// Apply rate limiter only to API routes
app.use("/api/notes", rateLimiter, notesRoutes);
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend,dist,index.html"))
})
}


const PORT = process.env.PORT || 5001;


connectDB().then(()=>{
    app.listen(PORT, () => {
console.log(` Server is running on http://localhost:${PORT}`);
});
})


