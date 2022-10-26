import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import QRCode from "qrcode";

import { prisma } from "../../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(() => {
    if (req.method === "POST") {
      const user = req.body.user as User;

      const { name, link } = req.body;

      const options = {
        margin: 1,
        width: 300,
      };

      QRCode.toDataURL(link, options, async (err, url) => {
        if (err) res.status(500).json({ error: err });

        const qrCode = await prisma.qrCode.create({
          data: {
            name,
            url: link,
            image: url,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            credits: {
              decrement: 1,
            },
          },
        });

        res.status(200).json({ ...qrCode });
      });
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  });
};

export default handler;
