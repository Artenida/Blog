import express from "express";
import { createPost, deletePost, getSinglePost, getPosts, updatePost, getUsersPost, getAuthors } from "../controllers/postController";
import { authenticateToken } from "../middleware/authenticationToken";
import { validateCreatePost, validateUpdatePost } from "../middleware/validationMiddleware";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/allPosts",getPosts)
router.get("/getSinglePost/:id",getSinglePost)
router.post("/createPost", verifyToken, validateCreatePost, createPost)
router.delete("/delete/:id", verifyToken, deletePost)
router.put("/update/:id", verifyToken, validateUpdatePost, updatePost);
router.get("/user/:userId", verifyToken, getUsersPost);
router.get("/authors", getAuthors);

export default router;