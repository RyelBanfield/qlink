import { Website } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../server/db/client";

const EditWebsite: NextPage<{ website: Website }> = ({ website }) => {
  return <div>{website.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const website = await prisma.website.findUnique({
    where: {
      name: context.params?.name as string,
    },
  });

  const isUserWebsiteOwner = website?.userId === session?.user?.id;

  if (!website || (website && !website.published && !isUserWebsiteOwner)) {
    return {
      notFound: true,
    };
  }

  return {
    props: { website: JSON.parse(JSON.stringify(website)) },
  };
};

export default EditWebsite;
