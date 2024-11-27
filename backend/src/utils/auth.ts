import { createHmac } from "crypto";

function generateHash(password: string, salt: string): string {
  const hashedPassword: string = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  return hashedPassword;
}

export { generateHash };
