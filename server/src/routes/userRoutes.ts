import express, { Router } from "express";
import { getUser, updateUser, deleteUser } from "../controllers/userControllers";
import { validateDeleteUser } from "../middleware/validationMiddleware";

const router: Router = express.Router();

router.use('/find/:userId', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', validateDeleteUser, deleteUser);

export default router;