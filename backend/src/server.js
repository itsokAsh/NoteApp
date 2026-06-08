import dotenv from "dotenv";
dotenv.config();

import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import cors from "cors";

import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
}));


 // Debugging line to check the value of MONGO_URI



app.use(express.json());

app.use(rateLimiter)

app.use((req,res,next)=>{
    console.log(`Req method: ${req.method} & Req URL: ${req.url}`); // Debugging line to check incoming requests
    next();
})

app.use("/api/notes",notesRoutes);
const PORT = process.env.PORT || 5001;


connectDB().then(()=>{
    app.listen(PORT, () => {
console.log(` Server is running on http://localhost:${PORT}`);
});
})


