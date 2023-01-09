import { User } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../server/db/client";

const Account: NextPage<{ user: User }> = ({ user }) => {
  return (
    <>
      <div className="mb-6 flex flex-col rounded bg-neutral-100 p-4">
        <h2 className="text-2xl font-bold text-neutral-900">Email</h2>
        <p className="font-medium text-neutral-600">{user.email}</p>
      </div>
      <div className="mb-6 flex flex-col rounded bg-neutral-100 p-4">
        <h2 className="text-2xl font-bold text-neutral-900">Current Plan</h2>
        <p className="font-medium text-neutral-600">{user.plan}</p>
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

export default Account;
