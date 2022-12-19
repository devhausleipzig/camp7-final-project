import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";
import { z, ZodError } from "zod";

const querySchema = z.object({
  chatId: z.string().uuid(),
});

const patchSchema = z.object({
  userId: z.string().uuid(),
});

type PostMessageQuery = {
  chatId: string;
};

const postMessageSchema = z.object({
  content: z.string(),
  authorId: z.string().uuid(),
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { chatId } = querySchema.parse(req.query);
    if (req.method == methods.get) {
      const conversation = await prisma.conversation.findUnique({
        where: { id: chatId },
        include: {
          participant: {
            select: {
              id: true,
              name: true,
              image: true,
              interests: true,
              bornAt: true,
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

    if (req.method === "PATCH") {
      const { userId } = patchSchema.parse(req.body);
      await prisma.message.updateMany({
        where: {
          AND: {
            conversationId: chatId,
            authorId: {
              not: userId,
            },
          },
        },
        data: {
          read: true,
        },
      });
      return res.status(201).end();
    }

    if (req.method === methods.post) {
      const input = postMessageSchema.parse(req.body);

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
    if (err instanceof ZodError) {
      res.status(422).send(err);
    }
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
