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
  BsTwitter,
} from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

import { prisma } from "../../../server/db/client";

const EditWebsite: NextPage<{ website: Website }> = ({ website }) => {
  const [theme, setTheme] = useState<typeof website.theme>(website.theme);
  const [websiteUpdated, setWebsiteUpdated] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Website>();

  const updateWebsite = (data: Website) => {
    fetch("/api/website/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: website.id,
        theme: data.theme,
        linkedWebsite: data.linkedWebsite,
        linkedFacebook: data.linkedFacebook,
        linkedInstagram: data.linkedInstagram,
        linkedTwitter: data.linkedTwitter,
        linkedLinkedin: data.linkedLinkedin,
        linkedEmail: data.linkedEmail,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setWebsiteUpdated(true);
        setTimeout(() => {
          setWebsiteUpdated(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
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
        <div className="flex gap-2">
          {website.linkedWebsite && (
            <a
              href={website.linkedWebsite}
              target="_blank"
              rel="noreferrer"
              className="mb-2"
            >
              <CgWebsite className="inline-block" />
            </a>
          )}
          {website.linkedFacebook && (
            <a
              href={website.linkedFacebook}
              target="_blank"
              rel="noreferrer"
              className="mb-2"
            >
              <BsFacebook className="inline-block" />
            </a>
          )}
        </div>
        <div className="flex w-full flex-col gap-2 px-6">
          {website.linkedWebsite && (
            <div className="w-full rounded border p-2 text-center">
              <a
                href={website.linkedWebsite}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center gap-2"
              >
                <CgWebsite className="inline-block" />
                <span className="text-center">Website</span>
              </a>
            </div>
          )}
          {website.linkedFacebook && (
            <a
              href={website.linkedFacebook}
              target="_blank"
              rel="noreferrer"
              className="mb-2"
            >
              <BsFacebook className="inline-block" />
            </a>
          )}
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(updateWebsite)}
        className="flex flex-grow flex-col rounded bg-neutral-100 p-4 text-neutral-900"
      >
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
        <div className="mb-3">
          <label className="mb-3 flex items-center gap-2">
            <CgWebsite className="mr-2 inline-block text-2xl" />
            <input
              type="url"
              placeholder="Website"
              defaultValue={website.linkedWebsite}
              {...register("linkedWebsite")}
              className="w-full rounded border p-2"
            />
          </label>

          <label className="mb-3 flex items-center gap-2">
            <BsFacebook className="mr-2 inline-block text-2xl" />
            <input
              type="url"
              placeholder="Facebook"
              defaultValue={website.linkedFacebook}
              {...register("linkedFacebook")}
              className="w-full rounded border p-2"
            />
          </label>

          <label className="mb-3 flex items-center gap-2">
            <BsInstagram className="mr-2 inline-block text-2xl" />
            <input
              type="url"
              placeholder="Instagram"
              defaultValue={website.linkedInstagram}
              {...register("linkedInstagram")}
              className="w-full rounded border p-2"
            />
          </label>

          <label className="mb-3 flex items-center gap-2">
            <BsTwitter className="mr-2 inline-block text-2xl" />
            <input
              type="url"
              placeholder="Twitter"
              defaultValue={website.linkedTwitter}
              {...register("linkedTwitter")}
              className="w-full rounded border p-2"
            />
          </label>

          <label className="mb-3 flex items-center gap-2">
            <BsLinkedin className="mr-2 inline-block text-2xl" />
            <input
              type="url"
              placeholder="Linkedin"
              defaultValue={website.linkedLinkedin}
              {...register("linkedLinkedin")}
              className="w-full rounded border p-2"
            />
          </label>

          <label className="mb-3 flex items-center gap-2">
            <BsEnvelope className="mr-2 inline-block text-2xl" />
            <input
              type="email"
              placeholder="Email"
              defaultValue={website.linkedEmail}
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
            {websiteUpdated ? "Website Updated!" : "Update Website"}
          </motion.button>
        </div>
      </form>
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
