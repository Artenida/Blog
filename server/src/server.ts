import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { Request, Response, NextFunction } from "express";
import { getUser } from "./controllers/userControllers";
import postRoutes from "./routes/postRoutes"
import tagRoutes from "./routes/tagRoutes"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
// import multer from 'multer';
import path from "path";

dotenv.config();

const app = express();
const base_url = process.env.BASE_URL;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// const upload = multer({dest: 'uploads/'})

// app.post(`${base_url}upload`, upload.single('file'), function(req,res) {
//   res.status(200).json("Image has been uploaded")
// })
const uploadPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadPath));

app.use(`${base_url}auth`, authRoutes);
app.use(`${base_url}users`, userRoutes);
app.use(`${base_url}posts`, postRoutes);
app.use(`${base_url}tags`, tagRoutes);
app.get(`${base_url}data`, getUser);

app.listen(process.env.DEV_PORT, () => {
  console.log("Server running on port: " + `${process.env.DEV_PORT}`);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = error.statusCode || 500;
  const message: string = error.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
