import { z } from "zod";

const PostMessageModel = z.object({
  conversation: z.string(),
  content: z.string(),
  author: z.string(),
});

const PostConversationModel = {
  participants: z.array(
    z.object({
      id: z.string(),
    })
  ),
};

const PostAddressModel = z
  .object({
    postalCode: z.number(),
    latitude: z.number().min(0).max(180),
    longitude: z.number().min(0).max(360),
  })
  .refine(async val => {
    const response = await fetch(
      `https://api.mapbox.com/check-some-location-data/${val.postalCode}`
    );

    const responseData = JSON.parse(await response.json());
    // use response to check if location data is valid
    let valid;

    if (valid) {
      return true;
    } else {
      return false;
    }
  }, "Location provided is not valid.");
