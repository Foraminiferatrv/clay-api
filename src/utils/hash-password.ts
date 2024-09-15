import { hash } from "bcrypt";

export async function hashPassword(password: string): Promise<string> | null {
  const salt = process.env.PASSWORD_SALT;

  if (!salt) {
    console.log("PASSWORD_SALT is undefined.");
    return null;
  }

  return await hash(password, salt);
}
