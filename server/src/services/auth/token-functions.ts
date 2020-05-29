import jwt from "jsonwebtoken";
import { secret } from "../../config/app-config";

export const verifyToken = (token: string): string | object => {
  try {
    const decoded: string | object = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return "";
  }
};
