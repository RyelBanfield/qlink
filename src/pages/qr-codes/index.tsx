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
        {user.plan === "Beginner" && (
          <>
            <div className="flex flex-col items-center justify-center">
              <h1 className="mb-6 text-center text-xl font-bold leading-none text-neutral-900">
                Beginner Plan -{" "}
                <span className="text-blue-700">{user.credits}</span> Credit
                {user.credits === 1 ? "" : "s"} Remaining
              </h1>
              <p className="mb-6 text-center text-lg font-medium text-neutral-900">
                You can create/view a QR Code but would need a credit or
                upgraded plan to save it.
              </p>
            </div>

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
                  Purchase Credit
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
          </>
        )}
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
