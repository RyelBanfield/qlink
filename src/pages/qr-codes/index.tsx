import { Prisma } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import QLinkCredits from "../../components/QLinkCredits";
import UserQRCodes from "../../components/UserQRCodes";
import { prisma } from "../../server/db/client";

const userWithQRCodes = Prisma.validator<Prisma.UserArgs>()({
  include: {
    qrCodes: true,
  },
});

type UserWithQrCodes = Prisma.UserGetPayload<typeof userWithQRCodes>;

const QRCodes: NextPage<{ user: UserWithQrCodes }> = ({ user }) => {
  return (
    <>
      <QLinkCredits user={user} />
      <UserQRCodes user={user} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      qrCodes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default QRCodes;
