import express from "express";
import { authenticateToken } from "../middleware/authenticationToken";
import { getTags } from "../controllers/tagsControllers";

const router = express.Router();

router.get("/getTags", authenticateToken, getTags)

export default router;