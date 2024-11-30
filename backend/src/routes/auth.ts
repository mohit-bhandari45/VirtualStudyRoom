import { Router } from "express";
import { handleCreateUser, handleGoogleLogin, handleLoginUser } from "../controllers/auth.js";

const router = Router();

router.post("/signup", handleCreateUser);
router.post("/login", handleLoginUser);
router.post("/google", handleGoogleLogin);

export default router;
