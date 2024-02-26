import express from "express";
import { login, register, signout } from "../controllers/authControllers";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", signout)

export default router