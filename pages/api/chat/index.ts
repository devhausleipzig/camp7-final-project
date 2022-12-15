import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";
import protectedRoute from "../../../utils/protectedRoute";

type PostMessageBody = {
  sender: string;
  recipient: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === methods.get) {
      const token = protectedRoute(req, res);
      if (!token) return;

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
                  image: true,
                  interests: true,
                },
              },
            },
          },
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user.conversations);
    }

    if (req.method == methods.post) {
      const input = JSON.parse(req.body) as PostMessageBody;

      const foundConversation = await prisma.conversation.findFirst({
        where: {
          participant: {
            every: {
              OR: [
                {
                  id: {
                    equals: input.sender,
                  },
                },
                {
                  id: {
                    equals: input.recipient,
                  },
                },
              ],
            },
          },
        },
      });

      if (foundConversation) {
        return res.status(409).json({ message: "Conversation already exists" });
      }

      const conversation = await prisma.conversation.create({
        data: {
          participant: {
            connect: [input.sender, input.recipient].map((id) => ({ id })),
          },
        },
      });
      return res.status(201).json({ chatId: conversation.id });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
