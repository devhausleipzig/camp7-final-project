import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";
import protectedRoute from "../../../utils/protectedRoute";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.get) {
      const token = protectedRoute(req, res);
      if (!token) {
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          id: token.user_id,
        },
        include: {
          conversations: {
            include: {
              messages: { take: 1, orderBy: { createdAt: "desc" } },
              participant: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                  interests: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json(user?.conversations);
      return;
    }

    res.status(500).json({ message: "Unknown request." });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
