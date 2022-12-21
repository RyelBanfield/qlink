import { Website } from "@prisma/client";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
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

import MobileDisplay from "../../../components/MobileDisplay";
import { prisma } from "../../../server/db/client";

const EditWebsite: NextPage<{ website: Website }> = ({ website }) => {
  const router = useRouter();
  const [theme, setTheme] = useState<typeof website.theme>(website.theme);
  const [links] = useState({
    linkedWebsite:
      website.linkedWebsite !== ""
        ? {
            type: "Website",
            link: website.linkedWebsite,
            icon: <CgWebsite className="inline-block" />,
          }
        : null,
    linkedFacebook:
      website.linkedFacebook !== ""
        ? {
            type: "Facebook",
            link: website.linkedFacebook,
            icon: <BsFacebook className="inline-block" />,
          }
        : null,
    linkedInstagram:
      website.linkedInstagram !== ""
        ? {
            type: "Instagram",
            link: website.linkedInstagram,
            icon: <BsInstagram className="inline-block" />,
          }
        : null,
    linkedTwitter:
      website.linkedTwitter !== ""
        ? {
            type: "Twitter",
            link: website.linkedTwitter,
            icon: <BsTwitter className="inline-block" />,
          }
        : null,
    linkedLinkedin:
      website.linkedLinkedin !== ""
        ? {
            type: "Linkedin",
            link: website.linkedLinkedin,
            icon: <BsLinkedin className="inline-block" />,
          }
        : null,
    linkedEmail:
      website.linkedEmail !== ""
        ? {
            type: "Email",
            link: website.linkedEmail,
            icon: <BsEnvelope className="inline-block" />,
          }
        : null,
  });

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
      .then(() => router.reload())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-grow flex-col sm:flex-row">
        <MobileDisplay theme={theme} website={website} links={links} />

        <form
          onSubmit={handleSubmit(updateWebsite)}
          className="flex max-h-[600px] max-w-[600px] flex-grow flex-col rounded bg-neutral-100 p-4 text-neutral-900"
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
              Update
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
