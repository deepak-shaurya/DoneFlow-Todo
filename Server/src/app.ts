import express from "express";
import cors from "cors";
import { connectDB } from "./Configs/DB/ConnectDB";
import { config } from "dotenv";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser())
config({
    path: "./.env"
   })
connectDB()

// Import routes
import userRoutes from "./Routes/user.route";
import todoRoutes from "./Routes/todo.route";
import listRoutes from "./Routes/list.route";
// Use routes
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/list", listRoutes);

app.listen( process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});