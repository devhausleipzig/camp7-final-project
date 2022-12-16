import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
import jwt from "jsonwebtoken";
import { Payload } from "../auth/login";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "GET") {
      const { ids } = req.query;
      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({ message: "Authorization required." });
        return;
      }

      const decodedToken = jwt.verify(
        token,
        process.env.TOKEN_KEY as string
      ) as Payload;

      const user = await prisma.user.findMany({
        where: {
          AND: [
            {
              id: {
                in: (ids as string).split(","),
              },
            },
            {
              likedBy: {
                every: {
                  id: {
                    not: decodedToken.user_id,
                  },
                },
              },
            },
            {
              rejectedBy: {
                every: {
                  id: {
                    not: decodedToken.user_id,
                  },
                },
              },
            },
          ],
        },
        include: {
          interests: true,
          location: true,
        },
      });

      res.status(200).json(user);
      return;
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Malformed token." });
      return;
    }

    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired." });
      return;
    }

    if (err instanceof jwt.NotBeforeError) {
      res.status(401).json({ message: "Token cannot be used yet." });
      return;
    }

    console.log(err);
    res.status(500).end();
  }
};
