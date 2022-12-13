import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { newCoordFromDist } from "../../../utils/distance";
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

			const refLat = 51;
			const refLon = 12;

			newCoordFromDist();

			res.json(
				await prisma.$queryRaw`
			SELECT id, name, distance FROM (
				SELECT "user"."id" AS id, "user"."name" AS name,
				( 6371 * acos( cos( radians(${refLat}) ) * cos( radians( "location"."lat" ) ) * cos( radians( "location"."lon" ) - radians(${refLon}) ) + sin( radians(${refLat}) ) * sin( radians( "location"."lat" ) ) ) ) AS distance
				FROM (
					"location" JOIN "user" ON "location"."userId" = "user"."id"
				)
			) AS subquery WHERE subquery.distance < 20;
			`
			);

			return;

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
