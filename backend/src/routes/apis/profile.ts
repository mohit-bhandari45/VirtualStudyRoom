import { Router } from "express";
import { handleGetProfile } from "../../controllers/profile.js";
const router = Router();

router.get("/", handleGetProfile);

export default router;
