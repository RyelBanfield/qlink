import { NextApiRequest, NextApiResponse } from "next";

import { env } from "../../../env/server.mjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("req.body", req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1LrqZ2EZaVDCxASzmZtBkum2",
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
              maximum: 10,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.redirect(303, session.url);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
