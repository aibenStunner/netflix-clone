import jwt from "jsonwebtoken";
import { IDecodedToken } from "../components/@types";

export async function verifyToken(token: string) {
  if (token) {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IDecodedToken;

    const userId = decodedToken.issuer;
    return userId;
  }
  return null;
}
