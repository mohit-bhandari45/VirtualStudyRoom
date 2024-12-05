import { Request, Response } from "express";
import prismaClient from "../lib/db.js";

interface UserInterface {
  id: string;
  email: string;
}

async function handleGetRoomHandler(req: Request, res: Response): Promise<any> {
  const user = req.user as UserInterface;

  const userWithRooms = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
    include: {
      rooms: true,
    },
  });

  return res.status(200).json({ userWithRooms });
}

async function handleCreateRoomHandler(
  req: Request,
  res: Response
): Promise<any> {
  const { id } = req.user as UserInterface;
  const { name, description, video } = req.body;

  try {
    if (!name || !description || !video) {
      return res
        .status(400)
        .json({ msg: "Name, description and video option is required" });
    }

    const room = await prismaClient.room.create({
      data: {
        name: name,
        description: description,
        createdById: id,
        videoChatEnabled: video,
      },
    });

    return res.status(201).json({ room });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export { handleGetRoomHandler, handleCreateRoomHandler };
