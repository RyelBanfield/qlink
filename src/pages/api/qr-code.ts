import type { NextApiRequest, NextApiResponse } from "next";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";

const credits = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });

    if (user) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          credits: {
            decrement: req.body.creditsUsed,
          },
        },
      });
    }

    res.status(200).json({ message: "Credits updated" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default credits;
