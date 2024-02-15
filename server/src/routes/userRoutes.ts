import express, { Request, Response, Router } from "express";
import { getUser } from "../controllers/userControllers";

const router: Router = express.Router();

router.use('/find/:userId', getUser);

export default router;