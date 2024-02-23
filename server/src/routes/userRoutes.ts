import express, { Request, Response, Router } from "express";
import { getUser, updateUser } from "../controllers/userControllers";

const router: Router = express.Router();

router.use('/find/:userId', getUser);
router.put('/update:id', updateUser);

export default router;