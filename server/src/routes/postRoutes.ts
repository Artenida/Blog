import express from "express";
import {
  createPost,
  deletePost,
  getSinglePost,
  getPosts,
  updatePost,
  getUsersPost,
  getAuthors,
  getPaginatedPosts,
  searchPosts,
  getBloggersPost,
} from "../controllers/postController";
import {
  validateCreatePost,
  validateUpdatePost,
} from "../middleware/validationMiddleware";
import { verifyToken } from "../middleware/verifyToken";
import multer from "multer";
import { authenticateToken } from "../middleware/authenticationToken";

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, files, cb) {
    cb(null, files.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/allPosts", getPosts);
router.get("/getSinglePost/:id", getSinglePost);
router.post("/createPost", verifyToken, upload.array("file", 5), validateCreatePost, createPost);
router.delete("/delete/:id", verifyToken, deletePost);
router.put("/update/:id", verifyToken, validateUpdatePost, updatePost);
router.get("/user/:userId", verifyToken, getUsersPost);
router.get("/users/:userId", getBloggersPost);
router.get("/authors", getAuthors);
// router.get("/nrOfPosts", getNumberOfPosts);
router.get("/paginatedPosts", getPaginatedPosts);
router.get("/search", searchPosts);

export default router;
