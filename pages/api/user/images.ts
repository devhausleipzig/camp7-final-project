import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";

type TokenData = {
	user_id: string;
	// email: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== methods.post) {
		res
			.status(500)
			.json({ message: `HTTP ${req.method} method not supported.` });
	}

	try {
		// validate token
		const token = req.headers.authorization;
		if (!token) {
			res.status(401).json({ message: "Authorization required." });
			return;
		}

		const decodedToken = jwt.verify(
			token,
			process.env.TOKEN_KEY as string
		) as TokenData;

		// get user ID
		const userId = decodedToken.user_id;

		// get image data
		const requestData = JSON.parse(req.body);
		const imageData = requestData.data;

		// insert into db
		await prisma.image.create({
			data: {
				userId: userId,
				imageData: imageData,
			},
		});

		// return
		res.status(200).json({
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
};
