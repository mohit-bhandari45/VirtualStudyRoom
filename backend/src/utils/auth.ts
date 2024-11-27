import { createHmac } from "crypto";

function generateHash(salt: string, password: string): string {
    const hashedPassword: string = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return hashedPassword;
}

export { generateHash };
