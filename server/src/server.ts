import express from "express";
import cors from 'cors';
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
const app = express();
const port = 5000;

app.use(cors());

//Middlewares
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
    console.log("Server running on port: " + port);
})

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     const statusCode: number = err.statusCode || 500;
//     const message: string = err.message || 'Internal Server Error';
//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message
//     });
// });

