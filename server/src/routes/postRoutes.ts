import express from "express";
import { createPost, deletePost, getSinglePost, getPosts, updatePost } from "../controllers/postController";
import { authenticateToken } from "../middleware/authenticationToken";

const router = express.Router();

router.get("/allPosts",getPosts)
router.get("/post/:id",getSinglePost)
router.post("/createPost", authenticateToken, createPost)
router.delete("/delete/:id", authenticateToken, deletePost)
router.put("/update/:id", authenticateToken, updatePost);

export default router;