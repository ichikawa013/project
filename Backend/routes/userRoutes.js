//userRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = express.Router();

// Route to get the logged-in user's details
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default router;