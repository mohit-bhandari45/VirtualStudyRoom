import { Router } from "express";
import profileRoutes from "./profile.js";
import authCheck from "../../middlewares/auth.js";
import roomRoutes from "./room.js";
const router = Router();

router.use(authCheck);

router.use("/profile", profileRoutes);
router.use("/room", roomRoutes);

export default router;
