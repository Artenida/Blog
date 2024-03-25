import express, { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  updateProfilePicture,
} from "../controllers/userControllers";
import { validateDeleteUser } from "../middleware/validationMiddleware";
import { verifyToken } from "../middleware/verifyToken";
import multer from "multer";

const router: Router = express.Router();
router.use(verifyToken);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.use("/find/:userId", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", validateDeleteUser, deleteUser);
router.put("/updatePicture/:id", upload.single("files"), updateProfilePicture);

export default router;
