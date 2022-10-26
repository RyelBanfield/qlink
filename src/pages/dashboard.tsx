import { Prisma } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import QLinkCredits from "../components/QLinkCredits";
import QRCodeCard from "../components/QRCodeCard";
import { prisma } from "../server/db/client";

const userWithQRCodes = Prisma.validator<Prisma.UserArgs>()({
  include: {
    qrCodes: true,
  },
});

type UserWithQrCodes = Prisma.UserGetPayload<typeof userWithQRCodes>;

const Dashboard: NextPage<{ user: UserWithQrCodes }> = ({ user }) => {
  return (
    <>
      <QLinkCredits user={user} />
      <h3 className="my-6 text-center text-xl font-bold text-neutral-100">
        Your QR Codes
      </h3>
      {user.qrCodes.length === 0 && (
        <div className="rounded bg-neutral-100 p-4">
          <p className="text-center font-medium text-neutral-900">
            You have not created any QR Codes yet.
          </p>
        </div>
      )}
      {user.qrCodes.map((qrCode) => (
        <QRCodeCard key={qrCode.id} qrCode={qrCode} />
      ))}
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

export default Dashboard;
