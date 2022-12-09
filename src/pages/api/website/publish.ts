import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async () => {
    if (req.method === "POST") {
      const { id, published } = req.body;

      const website = await prisma.website.update({
        where: {
          id,
        },
        data: { published },
      });

      res.status(200).json({ ...website });
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  });
};

export default handler;
