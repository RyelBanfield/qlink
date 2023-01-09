import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async () => {
    if (req.method === "PATCH") {
      const website = await prisma.website.update({
        where: {
          id: req.body.id,
        },
        data: {
          theme: req.body.theme,
          linkedWebsite: req.body.linkedWebsite,
          linkedFacebook: req.body.linkedFacebook,
          linkedInstagram: req.body.linkedInstagram,
          linkedTwitter: req.body.linkedTwitter,
          linkedLinkedin: req.body.linkedLinkedin,
          linkedEmail: req.body.linkedEmail,
        },
      });

      res.status(200).json({ ...website });
    } else {
      res.setHeader("Allow", "PATCH");
      res.status(405).end("Method Not Allowed");
    }
  });
};

export default handler;
