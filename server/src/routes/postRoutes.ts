import express from "express";
import {
  createPost,
  deletePost,
  getSinglePost,
  getPosts,
  updatePost,
  getUsersPost,
  getAuthors,
} from "../controllers/postController";
import { authenticateToken } from "../middleware/authenticationToken";
import {
  validateCreatePost,
  validateUpdatePost,
} from "../middleware/validationMiddleware";
import { verifyToken } from "../middleware/verifyToken";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/allPosts", getPosts);
router.get("/getSinglePost/:id", getSinglePost);
router.post("/createPost", verifyToken, upload.array("file", 5), createPost);
router.delete("/delete/:id", verifyToken, deletePost);
router.put("/update/:id", verifyToken, validateUpdatePost, updatePost);
router.get("/user/:userId", verifyToken, getUsersPost);
router.get("/authors", getAuthors);

export default router;
