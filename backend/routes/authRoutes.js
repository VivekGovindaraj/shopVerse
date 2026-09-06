import express from "express";
import { user, registerUser, loginUser, getUserProfile } from "../controllers/authControllers.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/home', user)
router.post("/register", registerUser)
router.post("/login", loginUser)

router.get('/profile', protect,getUserProfile)
export default router