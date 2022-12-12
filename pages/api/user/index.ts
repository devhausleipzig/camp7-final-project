import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

type GetUsersQuery = {
	interests: string;
	location: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method == methods.get) {
			const { interests, location } = req.query as GetUsersQuery;
			const parsedInterests = interests ? interests.split(",") : [];
			const parsedLocation = location
				? location.split(",").map(Number)
				: [];

			console.log(parsedInterests);
			console.log(parsedLocation);

			return await prisma.$queryRaw`
			SELECT id, ( 3959 * acos( cos( radians(37) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(-122) ) + sin( radians(37) ) * sin( radians( lat ) ) ) ) AS distance FROM location JOIN user ON userId == user.id WHERE distance < 25 ORDER BY distance LIMIT 20;
			`;

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
						interests: {
							select: {
								name: true
							}
						}
					}
				});
			}

			const someInterests = await prisma.user.findMany({
				where: {
					interests: { some: { OR: whereClauses } }
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
