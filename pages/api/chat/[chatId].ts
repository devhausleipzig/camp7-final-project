import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

type PostMessageQuery = {
  chatId: string;
};

type PostMessageBody = {
  content: string;
  authorId: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { chatId } = req.query as PostMessageQuery;

  try {
    if (req.method == methods.get) {
      const conversation = await prisma.conversation.findUnique({
        where: { id: chatId },
        include: {
          participant: {
            select: {
              name: true,
              avatar: true,
              interests: true,
            },
          },
          messages: {
            select: {
              updatedAt: true,
              content: true,
              authorId: true,
              createdAt: true,
            },
          },
        },
      });

      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      return res.status(200).json(conversation);
    }

    if (req.method === methods.post) {
      const input = req.body as PostMessageBody;

      const message = await prisma.message.create({
        data: {
          content: input.content,
          conversation: { connect: { id: chatId } },
          author: { connect: { id: input.authorId } },
        },
      });

      return res.status(201).json({ messageId: message.id });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
