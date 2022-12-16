import { NextApiRequest, NextApiResponse } from "next";
import { Payload } from "../pages/api/auth/login";
import jwt from "jsonwebtoken";

export default function protectedRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Authorization required." });
    return;
  }

  const decodedToken = jwt.verify(
    token,
    process.env.TOKEN_KEY as string
  ) as Payload;
  return decodedToken;
}
