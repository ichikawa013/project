//auth.js 
import express from "express";
import { register, login, changePassword } from "../controllers/authController.js";
import { getUserProfile } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", changePassword);
router.get("/profile", authMiddleware, getUserProfile);

export default router;