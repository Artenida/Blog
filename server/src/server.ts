import express from "express";
import cors from 'cors';
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { Request, Response, NextFunction } from 'express';
import cookieParser from "cookie-parser";
import { getUser } from "./controllers/userControllers";

const app = express();
const port = 5000;

app.use(cors());

//Middlewares
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.get("/api/data", getUser);

app.listen(port, () => {
    console.log("Server running on port: " + port);
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = error.statusCode || 500;
    const message: string = error.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

