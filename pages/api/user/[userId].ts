import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

type ParticipantProfileQuery = {
  userId: string;
};

type ParticipantProfileBody = {
  name: string;
  image: string;
  authorId: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query as ParticipantProfileQuery;

  try {
    if (req.method == methods.get) {
      const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          interests: true,
          location: true,
        },
      });

      if (!userProfile) {
        return res.status(404).json({ message: "userProfile not found" });
      }

      return res.status(200).json(userProfile);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
