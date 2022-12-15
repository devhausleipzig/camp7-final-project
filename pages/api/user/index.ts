import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../prisma/db";
import { BoundingRectangle } from "../../../utils/distance";
import { methods } from "../../../utils/methods";

const QueryUserModel = z
  .object({
    interests: z.optional(z.string()),
    location: z.optional(z.string()),
    radius: z.optional(z.string()),
  })
  .refine(
    val => {
      const locationGiven = Boolean(val.location);
      const radiusGiven = Boolean(val.radius);
      console.log(locationGiven);
      console.log(radiusGiven);
      return (locationGiven || radiusGiven) && radiusGiven && locationGiven;
    },
    { message: "Location and Radius must both be specified." }
  )
  .transform(val => {
    return {
      radius: val.radius ? Number(val.radius) : undefined,
      location: val.location ? val.location.split(",").map(Number) : undefined,
      interests: val.interests ? val.interests.split(",") : undefined,
    };
  });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == methods.get) {
      const { interests, location, radius } = QueryUserModel.parse(req.query);

      const [refLat, refLon] = location!;

      const boundingRect = new BoundingRectangle(radius!, [refLat, refLon]);

      // this shit will break if any of radius, location, or interests are missing
      // making all the parts of this query conditional is a bit tricky
      res.json(
        await prisma.$queryRaw`
					WITH prelim_query AS (
						SELECT "user"."id" AS "id", "user"."name" AS "name", "location"."lat" AS "lat", "location"."lon" AS "lon"
						FROM "user"
						JOIN "location"
						ON "location"."userId" = "user"."id"
						WHERE "location"."lat" > ${boundingRect.left}
						AND "location"."lat" < ${boundingRect.right}
						AND "location"."lon" > ${boundingRect.top}
						AND "location"."lon" < ${boundingRect.bottom}
					)
					SELECT "id", "name", "distance" FROM (
						SELECT DISTINCT "prelim_query"."id" AS "id" , "prelim_query"."name" AS "name",
						( 6371 * acos( cos( radians(${refLat}) ) * cos( radians( "prelim_query"."lat" ) ) * cos( radians( "prelim_query"."lon" ) - radians(${refLon}) ) + sin( radians(${refLat}) ) * sin( radians( "prelim_query"."lat" ) ) ) ) AS "distance"
						FROM prelim_query
						JOIN "_UserInterests" ON "_UserInterests"."B" = "prelim_query"."id"
						JOIN "interest" ON "_UserInterests"."A" = "interest"."id"
						WHERE "interest"."name" = ${interests![0]}
						OR "interest"."name" = ${interests![1]}
					) AS "subquery" WHERE "subquery"."distance" < ${radius};`
      );

      return;
    }

    res.status(500).json({ message: "Unknown request." });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
