import { JwtPayload } from "jsonwebtoken"; // Adjust this according to your JWT payload type.

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string | null; // Adjust the type of `user` according to your JWT payload
    }
  }
}
