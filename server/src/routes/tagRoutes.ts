import express from "express";
import { getTags } from "../controllers/tagsControllers";

const router = express.Router();

router.get("/getTags", getTags)

export default router;