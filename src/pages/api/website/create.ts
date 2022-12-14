import { User, Website } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async () => {
    if (req.method === "POST") {
      const user = req.body.user as User;

      const {
        image,
        name,
        theme,
        linkedWebsite,
        linkedFacebook,
        linkedInstagram,
        linkedTwitter,
        linkedLinkedin,
        linkedEmail,
      } = req.body as Website;

      const url = `https://qlink.tech/${name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/ /g, "-")}`;

      const website = await prisma.website.create({
        data: {
          image,
          name,
          url,
          theme,
          qrCode: "",
          linkedWebsite,
          linkedFacebook,
          linkedInstagram,
          linkedTwitter,
          linkedLinkedin,
          linkedEmail,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      res.status(200).json({ ...website });
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  });
};

export default handler;
