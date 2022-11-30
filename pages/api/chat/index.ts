import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

type GetUserConvQuery = {
  conversation_id: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.get) {
      const user = await prisma.user.findUnique({
        where: {
          id: "afb5233c-89e1-4b1c-ae68-845a3aaa0dd7",
        },
        include: {
          conversations: true,
        },
      });
      res.status(201).json(user?.conversations);
      return;
    }

    res.status(500).json({ message: "Unknown request." });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
