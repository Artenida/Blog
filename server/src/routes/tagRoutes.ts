import express from "express";
import { authenticateToken } from "../middleware/authenticationToken";
import { getTags } from "../controllers/tagsControllers";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/getTags", verifyToken, getTags)

export default router;