import express from "express";
import { signup, login } from "../controllers/authController.js";
import { fetchUsers, editUser, deleteUser } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// User management routes (protected and admin-only)
router.get("/users", authenticate, fetchUsers); // Fetch all users
router.put("/users/:id", authenticate, editUser); // Edit a user
router.delete("/users/:id", authenticate, deleteUser); // Delete a user

export default router;