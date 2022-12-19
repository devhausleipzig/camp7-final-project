import { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError, infer } from "zod";
import { prisma } from "../../../prisma/db";
import { methods } from "../../../utils/methods";
import _ from "lodash";

import bcrypt from "bcrypt";
const PostUserAsyncModel = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .refine(val => {
    const containsSpecialCharacter = /[!@#$%^&*]+/;
    return containsSpecialCharacter.test(val.password);
  }, "You must include at least one special character in your password: !@#$%^&*")
  .refine(val => {
    const containsSpecialCharacter = /[A-Z]+/;
    return containsSpecialCharacter.test(val.password);
  }, "You must include at least one upper case letter in your password.")
  .refine(val => {
    const containsSpecialCharacter = /[0-9]+/;
    return containsSpecialCharacter.test(val.password);
  }, "You must include at least one digit in your password.")
  .refine(async val => {
    const user = await prisma.user.findUnique({
      where: { email: val.email },
    });

    return !Boolean(user);
  }, "The email provided already exists. Please choose another one.");

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.post) {
      const userData = await PostUserAsyncModel.parseAsync(
        JSON.parse(req.body)
      );

      const user = await prisma.user.create({
        data: {
          ..._.omit(userData, ["password"]),
          saltAndHash: await bcrypt.hash(userData.password, 10),
        },
      });

      res.status(201).end();
      return;
    }

    res.status(500).json({ message: "Unknown request." });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(422).send(err.message);
      return;
    }

    console.log(err);
    res.status(500).end();
  }
};
