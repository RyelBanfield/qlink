import { Website } from "@prisma/client";
import classnames from "classnames";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";

import { prisma } from "../../server/db/client";

const EditWebsite: NextPage<{ website: Website }> = ({ website }) => {
  return (
    <>
      <div
        className={classnames("absolute left-0 top-0 flex h-full w-full", {
          "bg-neutral-100 text-neutral-900": website.theme === "light",
          "bg-neutral-900 text-neutral-100": website.theme === "dark",
        })}
      >
        <div className="flex flex-grow flex-col items-center pt-12">
          <Image
            src={website.image}
            width={75}
            height={75}
            alt="Website Logo"
            className="mb-6 rounded-full"
          />
          <h1 className="text-lg font-bold">{website.name}</h1>
        </div>
      </div>
    </>
  );
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
