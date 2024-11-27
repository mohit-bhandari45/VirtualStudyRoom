import { Router } from "express";
import { handleCreateUser, handleLoginUser } from "../controllers/auth.js";

const router = Router();

router.post("/signup", handleCreateUser);
router.post("/login", handleLoginUser);

export default router;
