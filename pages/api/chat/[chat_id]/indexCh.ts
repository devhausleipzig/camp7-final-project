import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { methods } from "../../../../utils/methods";

type GetChatsQuery = {
  chat_id: string;
};

type PostMessageBody = {
  sender: string;
  recipiant: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.get) {
      const { chat_id } = req.query as GetChatsQuery;
      const conversation = await prisma.conversation.findUnique({
        where: {
          id: chat_id,
        },
        include: {
          messages: true,
        },
      });
      res.status(200).json(conversation?.messages);
      return;
    }

    if (req.method == methods.post) {
      const { chat_id } = req.query as GetChatsQuery;
      const input = req.body as PostMessageBody;

      const result = await prisma.conversation.create({
        data: {
          participant: {
            connect: [input.sender, input.recipiant].map((id) => ({ id })),
          },
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
