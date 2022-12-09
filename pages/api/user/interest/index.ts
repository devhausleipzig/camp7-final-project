import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";
import { methods } from "../../../../utils/methods";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Payload } from "../../auth/login";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			res.status(401).send("Authorization required.");
			return;
		}

		const decodedToken = jwt.verify(
			token,
			process.env.TOKEN_KEY as string
		) as Payload;

		if (req.method == methods.post) {
			const interestData = JSON.parse(req.body);

			const interest = await prisma.interest.create({
				data: {
					...interestData,
					name: "",
					users: {
						connect: interestData.map((user: User) => {
							return { id: user.id };
						}),
					},
				},
			});

			res.status(201).json({ id: interest.id });
			return;
		}

		if (req.method == methods.put) {
			const interestData = JSON.parse(req.body);
			const { interest_id } = req.query;
			const interest = await prisma.interest.update({
				where: {
					id: interest_id as string,
				},
				data: {
					...interestData,
					name: "",
					users: {
						connect: {
							id: decodedToken.user_id,
						},
					},
				},
			});

			res.status(201).json({ id: interest.id });
			return;
		}

		res.status(500).json({ message: "Unknown request." });
	} catch (err) {
		if (err instanceof jwt.JsonWebTokenError) {
			res.status(401).json({ message: "Malformed token." });
			return;
		}

		if (err instanceof jwt.TokenExpiredError) {
			res.status(401).json({ message: "Token expired." });
			return;
		}

		if (err instanceof jwt.NotBeforeError) {
			res.status(401).json({ message: "Token cannot be used yet." });
			return;
		}

		console.log(err);
		res.status(500).end();
	}
};
