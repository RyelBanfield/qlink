import { Prisma } from "@prisma/client";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getSession } from "next-auth/react";

import Card from "../../components/Card";
import WebsiteCard from "../../components/WebsiteCard";
import { prisma } from "../../server/db/client";

const userWithWebsites = Prisma.validator<Prisma.UserArgs>()({
  include: {
    websites: true,
  },
});

type UserWithWebsites = Prisma.UserGetPayload<typeof userWithWebsites>;

const Websites: NextPage<{ user: UserWithWebsites }> = ({ user }) => {
  return (
    <>
      <Card>
        {user.plan === "Beginner" && user.websites.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-6 text-center text-xl font-bold leading-none text-neutral-900">
              Beginner Plan
            </h1>
            <p className="mb-6 text-center text-lg font-medium text-neutral-900">
              You can create one website but would need to upgrade your plan to
              publish it.
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="h-12 w-44 rounded bg-blue-700 text-center font-semibold"
            >
              <Link
                href="/create/website"
                className="flex h-full w-full items-center justify-center"
              >
                Create Website
              </Link>
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="mb-6 text-center text-xl font-bold leading-none text-neutral-900">
              Beginner Plan
            </h1>
            <p className="mb-6 text-center text-lg font-medium text-neutral-900">
              You have created a website. View it below.
            </p>
          </div>
        )}
      </Card>

      <h2 className="my-6 text-center text-xl font-bold text-neutral-100">
        Your Websites
      </h2>

      {user.websites.length === 0 && (
        <Card>
          <p className="text-center font-medium text-neutral-900">
            You have not created any websites yet.
          </p>
        </Card>
      )}

      {user.websites.map((website) => (
        <WebsiteCard key={website.id} website={website} />
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
      websites: {
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

export default Websites;
