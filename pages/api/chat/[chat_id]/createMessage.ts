import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { methods } from "../../../../utils/methods";

type PostMessageBody = {
  content: string;
  authorId: string;
};
type PostMessageQuery = {
  chat_id: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.post) {
      const { chat_id } = req.query as PostMessageQuery;
      const input = req.body as PostMessageBody;

      const result = await prisma.message.create({
        data: {
          content: input.content,
          conversation: { connect: { id: chat_id } },
          author: { connect: { id: input.authorId } },
        },
      });

      res.status(201).json({ chatId: result.id });
      return;
    }

    res.status(500).json({ message: "Unknown request." });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
