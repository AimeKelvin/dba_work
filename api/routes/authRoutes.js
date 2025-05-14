import express from "express";
import { signup, login } from "../controllers/authController.js";
import { fetchUsers, editUser, deleteUser } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;