import express from "express";
import { createPost, deletePost, getSinglePost, getPosts, updatePost, getUsersPost } from "../controllers/postController";
import { authenticateToken } from "../middleware/authenticationToken";
import { validateCreatePost, validateUpdatePost } from "../middleware/validationMiddleware";

const router = express.Router();

router.get("/allPosts",getPosts)
router.get("/getSinglePost/:id",getSinglePost)
router.post("/createPost", authenticateToken, validateCreatePost, createPost)
router.delete("/delete/:id", authenticateToken, deletePost)
router.put("/update/:id", authenticateToken, validateUpdatePost, updatePost);
router.get("/user/:id", authenticateToken, getUsersPost);

export default router;