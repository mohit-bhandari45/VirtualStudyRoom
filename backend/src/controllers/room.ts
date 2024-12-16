import { Request, Response } from "express";
import prismaClient from "../lib/db.js";

interface UserInterface {
  id: string;
  email: string;
}

async function handleGetAllRoomHandler(
  req: Request,
  res: Response
): Promise<any> {
  const user = req.user as UserInterface;

  const users = await prismaClient.user.findMany({
    where: {
      email: {
        not: user.email,
      },
    },
    include: {
      roomsCreated: {
        include: {
          participants: true,
        },
      },
    },
  });

  let allRooms = users.map((user: any) => {
    return user.roomsCreated || [];
  });

  allRooms = allRooms.map((roomArr: any) => {
    const activeRooms = roomArr.filter((room: any) => {
      return room.isActive === true;
    });
    return activeRooms;
  });

  return res.status(200).json({ allRooms });
}

async function handleGetRoomHandler(req: Request, res: Response): Promise<any> {
  const user = req.user as UserInterface;

  const userWithRooms = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
    include: {
      roomsCreated: {
        include: {
          participants: true,
        },
      },
    },
  });
  const rooms = userWithRooms?.roomsCreated;

  return res.status(200).json({ rooms });
}

async function handleGetJoinedRoomsHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.user as UserInterface;

  try {
    const joinedRooms = await prismaClient.userRoom.findMany({
      where: {
        userId: id,
      },
    });
    return res.status(200).json(joinedRooms);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
}

async function handleCreateRoomHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.user as UserInterface;
  const roomDetails = req.body;
  const fixedDuration = roomDetails.duration * 60 * 60 * 1000;

  try {
    if (
      !roomDetails.name ||
      !roomDetails.description ||
      !roomDetails.features.video ||
      !roomDetails.duration
    ) {
      return res.status(400).json({
        msg: "Name, description,duration and video option is required",
      });
    }

    const room = await prismaClient.room.create({
      data: {
        name: roomDetails.name,
        description: roomDetails.description,
        createdById: id,
        videoChatEnabled: roomDetails.features.video,
        expiresAt: new Date(Date.now() + fixedDuration),
      },
    });

    return res.status(201).json({ room });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

interface Params {
  id: string;
}

async function handleJoinRoomHandler(
  req: Request<Params>,
  res: Response
): Promise<any> {
  const { id: roomId } = req.params;
  const { id: userId } = req.user as UserInterface;

  try {
    const existingRoom = await prismaClient.userRoom.findUnique({
      where: {
        userId_roomId: {
          userId,
          roomId,
        },
      },
    });

    if (existingRoom) {
      return res.status(400).json({ msg: "Already Joined" });
    }

    const roomJoined = await prismaClient.userRoom.create({
      data: {
        userId: userId,
        roomId: roomId,
        joinedAt: new Date(),
      },
    });

    return res.status(201).json({ roomJoined });
  } catch (error) {
    console.error("Error joining room:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

export {
  handleGetRoomHandler,
  handleGetAllRoomHandler,
  handleGetJoinedRoomsHandler,
  handleCreateRoomHandler,
  handleJoinRoomHandler,
};
