import express, { Router } from "express";
import { getUser, updateUser, deleteUser } from "../controllers/userControllers";

const router: Router = express.Router();

router.use('/find/:userId', getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;