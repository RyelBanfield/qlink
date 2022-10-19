import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import QRCode from "qrcode";

import { prisma } from "../../server/db/client";

const credits = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const user = req.body.user as User;

    const { name, link } = req.body;

    const options = {
      margin: 1,
      width: 300,
    };

    QRCode.toDataURL(link, options, async (err, url) => {
      if (err) res.status(500).json({ error: err });

      await prisma.qrCode.create({
        data: {
          name,
          url: link,
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

      res.status(200).json({ url });
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default credits;
