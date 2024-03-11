import express from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postController";

const router = express.Router();

router.get("/allPosts",getPosts)
router.get("/post/:id",getPost)
router.post("/addPost", addPost)
router.delete("/deletePost/:id", deletePost)
router.put("/updatePost/:id", updatePost);

export default router;