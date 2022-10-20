import type { NextApiRequest, NextApiResponse } from "next";
import QRCode from "qrcode";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, link } = req.body;

    const options = {
      margin: 1,
      width: 300,
    };

    QRCode.toDataURL(link, options, async (err, url) => {
      if (err) res.status(500).json({ error: err });

      const qrCode = {
        name,
        url: link,
        image: url,
      };

      res.status(200).json({ ...qrCode });
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
