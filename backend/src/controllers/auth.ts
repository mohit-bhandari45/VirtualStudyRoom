import { randomBytes } from "crypto";
import { Request, Response } from "express";
import { generateHash } from "../utils/auth.js";
import prismaClient from "../lib/db.js";
import { generateToken, UserPayload } from "../services/auth.js";

async function handleCreateUser(req: Request, res: Response): Promise<any> {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(409).json({ msg: "Email Already registered" });
    }

    const salt: string = randomBytes(16).toString();
    const hashedPassword: string = generateHash(password, salt);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        salt,
      },
    });
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleLoginUser(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({ msg: "Email not found" });
    }

    const salt: string = user.salt!;
    const userProvidedHashedPassword: string = generateHash(password, salt);

    if (userProvidedHashedPassword != user.password) {
      return res.status(401).json({ msg: "Wrong Password!" });
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
    };
    const token: string = generateToken(payload);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleGoogleLogin(req: Request, res: Response): Promise<any> {
  const { name, email } = req.body;
  console.log(name, email);

  try {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      const payload: UserPayload = {
        id: existingUser.id,
        email: existingUser.email,
      };
      const token: string = generateToken(payload);
      return res.status(200).json({ token });
    }

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
      },
    });
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
    };
    const token: string = generateToken(payload);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

export { handleCreateUser, handleLoginUser, handleGoogleLogin };
