import { Router } from "express";
import profileRoutes from "./profile.js";
import authCheck from "../../middlewares/auth.js";
const router = Router();

router.use(authCheck);

router.use("/profile", profileRoutes);

export default router;
