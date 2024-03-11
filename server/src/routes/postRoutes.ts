import express from "express";
import { addPost, deletePost, getSinglePost, getPosts, updatePost } from "../controllers/postController";

const router = express.Router();

router.get("/allPosts",getPosts)
router.get("/post/:id",getSinglePost)
router.post("/addPost", addPost)
router.delete("/deletePost/:id", deletePost)
router.put("/updatePost/:id", updatePost);

export default router;