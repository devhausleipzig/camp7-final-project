import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

type GetUsersQuery = {
	interests: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.get) {
			const { interests } = req.query as GetUsersQuery;
			const parsedInterests = interests.split(",");

			console.log(parsedInterests);

			let allInterests: User[] = [];

			const whereClauses = parsedInterests.map((interest) => {
				return { name: interest };
			});

			if (parsedInterests.length > 2) {
				allInterests = await prisma.user.findMany({
					where: {
						interests: { some: { AND: whereClauses } }
					},
					include: {
						info: true,
						interests: true
					}
				});
			}

			const someInterests = await prisma.user.findMany({
				where: {
					interests: { some: { AND: whereClauses } }
				},
				include: {
					info: true,
					interests: {
						select: {
							name: true
						}
					}
				}
			});

			const matchingUsers = [...allInterests, ...someInterests];

			res.status(200).json(matchingUsers);
			return;
		}

		res.status(500).json({ message: "Unknown request." });
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
