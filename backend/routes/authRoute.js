import express from "express";

import auth from "../middleware/auth.js";
import { getUserInfo, loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", auth, getUserInfo);

export default router;