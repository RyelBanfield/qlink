import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";

import { env } from "../../env/server.mjs";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(env.STRIPE_SECRET_KEY);
const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

import { prisma } from "../../server/db/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        await buffer(req),
        sig,
        webhookSecret
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const creditsPurchased = session.amount_total / 500;

        const user = await prisma.user.findUnique({
          where: {
            email: session.customer_details.email,
          },
        });

        if (user) {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              credits: {
                increment: creditsPurchased,
              },
            },
          });

          console.log(
            "Credits of user: " + user.email + " have been incremented"
          );
        } else {
          console.log(
            "User with email: " + session.customer_details.email + " not found"
          );
        }
        break;
      }
      default: {
        console.log(`Unhandled event type ${event.type}`);
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
