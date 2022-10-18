import { NextApiRequest, NextApiResponse } from "next";

import { env } from "../../../env/server.mjs";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const authSession = await getServerAuthSession({ req, res });

      if (authSession) {
        if (authSession.user) {
          const user = await prisma.user.findUnique({
            where: {
              id: authSession.user.id,
            },
          });

          if (user) {
            const session = await stripe.checkout.sessions.create({
              customer_email: user.email,
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
          } else {
            res.status(404).json({
              message: "User with id: " + authSession.user.id + " not found",
            });
          }
        } else {
          res.status(401).json({ message: "User not found" });
        }
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
