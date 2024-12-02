import { Request, Response } from "express";
import prismaClient from "../lib/db.js";
import { JwtPayload } from "jsonwebtoken";

async function handleGetProfile(req: Request, res: Response): Promise<any> {
  const user = req.user as JwtPayload;
  const getUser = await prismaClient.user.findFirst({
    where: {
      email: user.email,
    },
  });
  console.log(getUser);

  return res.status(200).json({ getUser });
}

export { handleGetProfile };
