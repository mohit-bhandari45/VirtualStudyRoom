import JWT from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

export interface UserPayload {
  id: string;
  email: string;
}

function generateToken(payload: UserPayload): string {
  const token: string = JWT.sign(payload, secret);
  return token;
}

export { generateToken };
