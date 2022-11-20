import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";

import Card from "../../components/Card";
import QRCodeCard from "../../components/QRCodeCard";
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
      <Card>
        <h1 className="mb-6 text-center text-xl font-bold leading-none text-neutral-900">
          You have <span className="text-blue-700">{user.credits}</span> Credit
          {user.credits === 1 ? "" : "s"}
        </h1>
        <div className="flex justify-evenly">
          <form
            action="/api/checkout/credits"
            method="POST"
            className="flex flex-col items-center"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="h-12 w-44 rounded bg-blue-700 text-center font-semibold"
            >
              Purchase credit
            </motion.button>
          </form>
          <div className="flex flex-col items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="h-12 w-44 rounded bg-blue-700 text-center font-semibold"
            >
              <Link
                href="/create/qr-code"
                className="flex h-full w-full items-center justify-center"
              >
                Create QR Code
              </Link>
            </motion.button>
          </div>
        </div>
      </Card>

      <h2 className="my-6 text-center text-xl font-bold text-neutral-100">
        Your QR Codes
      </h2>
      {user.qrCodes.length === 0 && (
        <Card>
          <p className="text-center font-medium text-neutral-900">
            You have not created any QR Codes yet.
          </p>
        </Card>
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

export default QRCodes;
