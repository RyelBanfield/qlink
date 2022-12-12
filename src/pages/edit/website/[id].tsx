import { Prisma } from "@prisma/client";
import classnames from "classnames";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [theme, setTheme] = useState<string>(website.theme);
  const { register, handleSubmit } = useForm<WebsiteWithLinks>();

  const onSubmit = (data: WebsiteWithLinks) => {
    fetch("/api/website/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: website.id,
        theme: data.theme,
      }),
    })
      .then((res) => res.json())
      .then(() => router.push(`/websites`))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className={classnames(
          "mx-auto mb-6 flex h-[450px] w-1/2 min-w-[220px] flex-col items-center rounded-3xl border-8 border-neutral-800 pt-8",
          {
            "bg-neutral-100 text-neutral-900": theme === "light",
            "bg-neutral-900 text-neutral-100": theme === "dark",
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
        <h1 className="font-bold">{website.name}</h1>
      </div>

      <div className="flex flex-grow rounded bg-neutral-100 text-neutral-900">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col p-4"
        >
          <div className="mb-4 flex gap-2">
            <label className="flex gap-2 text-neutral-900">
              <input
                type="radio"
                id="light"
                {...register("theme", {
                  required: true,
                  onChange: (e) => {
                    setTheme(e.target.value);
                  },
                })}
                value="light"
                defaultChecked={theme === "light"}
                className="rounded border-2 border-gray-900 p-2 text-neutral-900"
              />
              Light
            </label>
            <label className="flex gap-2 text-neutral-900">
              <input
                type="radio"
                id="dark"
                {...register("theme", {
                  required: true,
                  onChange: (e) => {
                    setTheme(e.target.value);
                  },
                })}
                value="dark"
                defaultChecked={theme === "dark"}
                className="rounded border-2 border-gray-900 p-2 text-neutral-900"
              />
              Dark
            </label>
          </div>

          <div className="mt-auto">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="w-full rounded bg-blue-700 p-2 text-neutral-100"
            >
              Save Changes
            </motion.button>
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
