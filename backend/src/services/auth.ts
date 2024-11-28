import JWT, { JwtPayload } from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

export interface UserPayload {
  id: string;
  email: string;
}

function generateToken(payload: UserPayload): string {
  const token: string = JWT.sign(payload, secret);
  return token;
}

function decodeToken(token: string): string | JwtPayload {
  const user = JWT.verify(token, secret);
  return user;
}

export { generateToken, decodeToken };
