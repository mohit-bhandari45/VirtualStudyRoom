import { Router } from "express";
import {
  handleCreateRoomHandler,
  handleGetRoomHandler,
} from "../../controllers/room.js";

const router = Router();

router.get("/", handleGetRoomHandler);
router.post("/create", handleCreateRoomHandler);

export default router;
