import { QrCode, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise(async () => {
    if (req.method === "POST") {
      const user = req.body.user as User;

      const { name, url, image, qrCodeImage } = req.body as QrCode;

      const qrCode = await prisma.qrCode.create({
        data: {
          name,
          url,
          image,
          qrCodeImage,
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
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).end("Method Not Allowed");
    }
  });
};

export default handler;
