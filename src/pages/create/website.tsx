import { User } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../server/db/client";

const WebsiteCreator: NextPage<{ user: User }> = ({}) => {
  return (
    <>
      <div className="mb-6 flex flex-grow">
        <div className="grid flex-grow grid-cols-10 rounded bg-white">
          <div className="col-span-4 p-8">
            <div className="h-full rounded-3xl border-8 border-neutral-800 bg-black"></div>
          </div>
          <div className="col-span-6"></div>
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
    props: { user },
  };
};

export default WebsiteCreator;
