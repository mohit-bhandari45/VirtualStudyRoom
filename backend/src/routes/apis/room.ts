import { Router } from "express";
import {
  handleCreateRoomHandler,
  handleGetAllRoomHandler,
  handleGetJoinedRoomsHandler,
  handleGetRoomHandler,
  handleJoinRoomHandler,
} from "../../controllers/room.js";

const router = Router();

router.get("/", handleGetAllRoomHandler);
router.get("/get", handleGetRoomHandler);
router.get("/joined", handleGetJoinedRoomsHandler);
router.post("/create", handleCreateRoomHandler);
router.get("/join/:id", handleJoinRoomHandler);

export default router;
