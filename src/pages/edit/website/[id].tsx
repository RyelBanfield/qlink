import { Website } from "@prisma/client";
import classnames from "classnames";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  BsEnvelope,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsPhone,
  BsTwitter,
} from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

import { prisma } from "../../../server/db/client";

const EditWebsite: NextPage<{ website: Website }> = ({ website }) => {
  const [theme, setTheme] = useState<typeof website.theme>(website.theme);
  const [websiteUpdated, setWebsiteUpdated] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Website>();

  const updateWebsite = (data: Website) => {
    console.log(data);
    // fetch("/api/website/edit", {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: website.id,
    //     theme: data.theme,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     setWebsiteUpdated(true);
    //     setTimeout(() => {
    //       setWebsiteUpdated(false);
    //     }, 3000);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      {/* Display */}
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

      {/* Form */}
      <div className="flex flex-grow flex-col rounded bg-neutral-100 p-4 text-neutral-900">
        <form onSubmit={handleSubmit(updateWebsite)} className="flex flex-col">
          {/* Theme */}
          <div className="mb-3 flex gap-2">
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

          {/* Links */}
          <div>
            <label className="mb-3 flex items-center gap-2">
              <CgWebsite className="mr-2 inline-block text-2xl" />
              <input
                type="url"
                placeholder="Website"
                {...register("linkedWebsite")}
                className="w-full rounded border p-2"
              />
            </label>

            <label className="mb-3 flex items-center gap-2">
              <BsFacebook className="mr-2 inline-block text-2xl" />
              <input
                type="url"
                placeholder="Facebook"
                {...register("linkedFacebook")}
                className="w-full rounded border p-2"
              />
            </label>

            <label className="mb-3 flex items-center gap-2">
              <BsInstagram className="mr-2 inline-block text-2xl" />
              <input
                type="url"
                placeholder="Instagram"
                {...register("linkedInstagram")}
                className="w-full rounded border p-2"
              />
            </label>

            <label className="mb-3 flex items-center gap-2">
              <BsTwitter className="mr-2 inline-block text-2xl" />
              <input
                type="url"
                placeholder="Twitter"
                {...register("linkedTwitter")}
                className="w-full rounded border p-2"
              />
            </label>

            <label className="mb-3 flex items-center gap-2">
              <BsLinkedin className="mr-2 inline-block text-2xl" />
              <input
                type="url"
                placeholder="Linkedin"
                {...register("linkedLinkedin")}
                className="w-full rounded border p-2"
              />
            </label>

            <label className="mb-3 flex items-center gap-2">
              <BsEnvelope className="mr-2 inline-block text-2xl" />
              <input
                type="email"
                placeholder="Email"
                {...register("linkedEmail")}
                className="w-full rounded border p-2"
              />
            </label>
          </div>

          <div className="mt-auto">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className="w-full rounded bg-blue-700 p-2 text-neutral-100"
            >
              {websiteUpdated ? "Website Updated!" : "Updated Website"}
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
