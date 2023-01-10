import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async () => {
    if (req.method === "DELETE") {
      const website = await prisma.website.delete({
        where: {
          id: req.body.id,
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
