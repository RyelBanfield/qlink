import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";

import { prisma } from "../server/db/client";

const Dashboard: NextPage<{ user: User }> = ({ user }) => {
  return (
    <>
      <div className="rounded bg-neutral-100 p-4">
        <h1 className="mb-6 text-center text-xl font-bold leading-none text-neutral-900">
          Dashboard
        </h1>

        <div className="flex justify-evenly">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="h-12 w-44 rounded bg-blue-700 text-center font-semibold"
          >
            <Link
              href="/qr-codes"
              className="flex h-full w-full items-center justify-center"
            >
              QR Codes
            </Link>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="h-12 w-44 rounded bg-blue-700 text-center font-semibold"
          >
            <Link
              href="/websites"
              className="flex h-full w-full items-center justify-center"
            >
              Websites
            </Link>
          </motion.button>
        </div>
      </div>
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
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Dashboard;
