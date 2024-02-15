import express from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
const app = express();
const port = 5000;

//Middlewares
app.use(express.json())

// app.get("/", (req, res) => {
//     res.send("Hello there!");
// });
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.listen(port, () => {
    console.log("Server running on port: " + port);
})