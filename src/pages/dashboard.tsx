import { Prisma } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";

import QLinkCredits from "../components/QLinkCredits";
import { prisma } from "../server/db/client";

const userWithQRCodes = Prisma.validator<Prisma.UserArgs>()({
  include: {
    qrCodes: true,
  },
});

type UserWithQrCodes = Prisma.UserGetPayload<typeof userWithQRCodes>;

const Dashboard = ({ user }: { user: UserWithQrCodes }) => {
  return (
    <>
      <QLinkCredits user={user} />
      <h3 className="my-6 text-center text-3xl font-bold leading-none text-neutral-100">
        Your QR Codes
      </h3>
      {user.qrCodes.length === 0 && (
        <div className="flex h-20 flex-col items-center justify-center rounded-md bg-neutral-100 font-medium">
          <p className="text-center text-neutral-900">
            You have not created any QR Codes yet.
          </p>
        </div>
      )}
      {user.qrCodes.map((qrCode) => (
        <div
          key={qrCode.id}
          className="mb-3 flex justify-between rounded-md bg-neutral-100 p-6"
        >
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold text-neutral-900">
              {qrCode.name}
            </h4>
            <a
              href={qrCode.url}
              target="_blank"
              className="text-neutral-900 hover:underline"
              rel="noreferrer"
            >
              {qrCode.url}
            </a>
          </div>
          <Link href={`/qr-codes/${qrCode.id}`}>
            <a className="my-2 rounded-md bg-blue-700 p-2 px-6 text-white">
              View
            </a>
          </Link>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    include: {
      qrCodes: true,
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Dashboard;
