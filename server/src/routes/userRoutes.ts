import express, { Router } from "express";
import { getUser, updateUser, deleteUser, updateProfilePicture } from "../controllers/userControllers";
import { validateDeleteUser } from "../middleware/validationMiddleware";
import { verifyToken } from "../middleware/verifyToken";

const router: Router = express.Router();
router.use(verifyToken);

router.use('/find/:userId', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', validateDeleteUser, deleteUser);
router.put('/updatePicture/:id', updateProfilePicture);

export default router;