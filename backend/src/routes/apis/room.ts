import { Router } from "express";
import {
  handleCreateRoomHandler,
  handleGetAllRoomHandler,
  handleGetRoomHandler,
  handleJoinRoomHandler,
} from "../../controllers/room.js";

const router = Router();

router.get("/", handleGetAllRoomHandler);
router.get("/get", handleGetRoomHandler);
router.post("/create", handleCreateRoomHandler);
router.get("/join/:id", handleJoinRoomHandler);

export default router;
