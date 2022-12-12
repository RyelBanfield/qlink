import { Prisma } from "@prisma/client";
import classnames from "classnames";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { prisma } from "../../../server/db/client";

const websiteWithLinks = Prisma.validator<Prisma.WebsiteArgs>()({
  include: {
    links: true,
  },
});

type WebsiteWithLinks = Prisma.WebsiteGetPayload<typeof websiteWithLinks>;

const EditWebsite: NextPage<{ website: WebsiteWithLinks }> = ({ website }) => {
  const [theme, setTheme] = useState<string>(website.theme);
  const { register, handleSubmit } = useForm<WebsiteWithLinks>();

  const onSubmit = (data: WebsiteWithLinks) => {
    console.log(data);
  };

  return (
    <>
      <div
        className={classnames(
          "mx-auto mb-6 flex h-[450px] w-1/2 min-w-[220px] flex-col items-center rounded-3xl border-8 border-neutral-800 pt-8",
          {
            "bg-neutral-100": theme === "light",
            "bg-neutral-900": theme === "dark",
          }
        )}
      >
        <Image
          src={website.image}
          width={50}
          height={50}
          alt="Website Logo"
          className="mb-4 rounded-full"
        />
        <h1 className="font-bold text-neutral-900">{website.name}</h1>
        <ul>
          {website.links?.map((link) => (
            <li key={link.id}>{link.name}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-grow rounded bg-neutral-100 p-8 text-neutral-900">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-12 flex flex-grow flex-col"
        >
          <div className="mb-4 flex gap-2">
            <input
              type="radio"
              id="light"
              {...register("theme", {
                required: true,
                onChange: () => setTheme("light"),
              })}
              value="light"
              defaultChecked={theme === "light"}
              className="rounded border-2 border-gray-900 p-2 text-neutral-900"
            />
            <label htmlFor="light" className="text-neutral-900">
              Light
            </label>
            <input
              type="radio"
              id="dark"
              {...register("theme", {
                required: true,
                onChange: () => setTheme("dark"),
              })}
              value="dark"
              defaultChecked={theme === "dark"}
              className="rounded border-2 border-gray-900 p-2 text-neutral-900"
            />
            <label htmlFor="dark" className="text-neutral-900">
              Dark
            </label>
          </div>
        </form>
      </div>
    </>
  );
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
