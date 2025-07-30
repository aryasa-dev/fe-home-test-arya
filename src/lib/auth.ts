import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getAuthUser() {
  const token = cookies().get("ACCESS_TOKEN")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as { id: string; username: string; role?: string };
  } catch (err) {
    return null;
  }
}
