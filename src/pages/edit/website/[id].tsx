import { Website } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../server/db/client";

const EditWebsite: NextPage<{ website: Website }> = ({ website }) => {
  return <div>{website.name}</div>;
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

  const website = await prisma.website.findUnique({
    where: {
      id: context.query.id as string,
    },
  });

  return {
    props: { website: JSON.parse(JSON.stringify(website)) },
  };
};

export default EditWebsite;
