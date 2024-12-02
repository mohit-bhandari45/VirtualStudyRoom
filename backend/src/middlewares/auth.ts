import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../services/auth.js";

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken: string = req.headers["authorization"]!;

  const token: string = bearerToken.split(" ")[1];

  const user = decodeToken(token);
  req.user = user;
  next();
};

export default authCheck;
