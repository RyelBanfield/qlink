import { Website } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";

import { prisma } from "../../server/db/client";

const EditWebsite: NextPage<{ website: Website }> = ({ website }) => {
  return <div>{website.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const website = await prisma.website.findUnique({
    where: {
      name: context.params?.name as string,
    },
  });

  return {
    props: { website: JSON.parse(JSON.stringify(website)) },
  };
};

export default EditWebsite;
