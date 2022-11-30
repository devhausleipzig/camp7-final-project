import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { methods } from "../../../../utils/methods";

type PostMessageQuery = {
  chat_id: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.post) {
      const { chat_id } = req.query as PostMessageQuery;
      console.log(chat_id);

      const result = await prisma.conversation.findUnique({
        where: { id: chat_id },
        include: {
          messages: true,
        },
      });

      res.status(201).json(result?.messages);
      return;
    }

    res.status(500).json({ message: "Unknown request." });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
