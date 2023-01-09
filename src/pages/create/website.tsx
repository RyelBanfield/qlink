import { User, Website } from "@prisma/client";
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

import { prisma } from "../../server/db/client";

const WebsiteCreator: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Website>();
  const [website, setWebsite] = useState<Website | null>(null);

  const onSubmit = (data: Website) => {
    if (data.image && data.image.length > 0) {
      const reader = new FileReader();
      const blob = new Blob([data.image[0] as BlobPart], {
        type: "image/png",
      });
      reader.readAsDataURL(blob);

      reader.onload = () => {
        setWebsite({
          ...data,
          image: reader.result as string,
        });
      };

      return;
    }

    data.image = `https://avatars.dicebear.com/api/initials/${data.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/ /g, "-")}.svg`;

    setWebsite(data);
  };

  const onConfirm = (website: Website) => {
    fetch("/api/website/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        image: website.image,
        name: website.name,
        theme: website.theme,
        linkedWebsite: website.linkedWebsite,
        linkedFacebook: website.linkedFacebook,
        linkedInstagram: website.linkedInstagram,
        linkedTwitter: website.linkedTwitter,
        linkedLinkedin: website.linkedLinkedin,
        linkedEmail: website.linkedEmail,
      }),
    })
      .then((res) => res.json())
      .then(() => router.push(`/websites`))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-grow flex-col rounded bg-neutral-100 p-6 sm:flex-row">
        <div className="flex w-full flex-grow flex-col sm:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-12 mt-6 flex flex-grow flex-col"
          >
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                onChange: () => {
                  setWebsite(null);
                },
              })}
              className="mb-3 rounded border-2 border-gray-700 p-2 text-neutral-900"
            />
            <input
              type="text"
              placeholder="Enter Name or Header Website"
              {...register("name", {
                required: true,
                onChange: () => {
                  setWebsite(null);
                },
              })}
              className="mb-3 w-full rounded border p-2"
            />
            <div className="mb-3 flex gap-2">
              <input
                type="radio"
                id="light"
                {...register("theme", { required: true })}
                value="light"
                defaultChecked
                className="rounded border-2 border-gray-900 p-2 text-neutral-900"
              />
              <label htmlFor="light" className="text-neutral-900">
                Light
              </label>
              <input
                type="radio"
                id="dark"
                {...register("theme", { required: true })}
                value="dark"
                className="rounded border-2 border-gray-900 p-2 text-neutral-900"
              />
              <label htmlFor="dark" className="text-neutral-900">
                Dark
              </label>
            </div>

            <div className="mb-3 text-neutral-900">
              <label className="mb-3 flex items-center gap-2">
                <CgWebsite className="mr-2 inline-block text-2xl" />
                <input
                  type="url"
                  placeholder="Website"
                  {...register("linkedWebsite", {
                    onChange: () => {
                      setWebsite(null);
                    },
                  })}
                  className="w-full rounded border p-2"
                />
              </label>

              <label className="mb-3 flex items-center gap-2">
                <BsFacebook className="mr-2 inline-block text-2xl" />
                <input
                  type="url"
                  placeholder="Facebook"
                  {...register("linkedFacebook", {
                    onChange: () => {
                      setWebsite(null);
                    },
                  })}
                  className="w-full rounded border p-2"
                />
              </label>

              <label className="mb-3 flex items-center gap-2">
                <BsInstagram className="mr-2 inline-block text-2xl" />
                <input
                  type="url"
                  placeholder="Instagram"
                  {...register("linkedInstagram", {
                    onChange: () => {
                      setWebsite(null);
                    },
                  })}
                  className="w-full rounded border p-2"
                />
              </label>

              <label className="mb-3 flex items-center gap-2">
                <BsTwitter className="mr-2 inline-block text-2xl" />
                <input
                  type="url"
                  placeholder="Twitter"
                  {...register("linkedTwitter", {
                    onChange: () => {
                      setWebsite(null);
                    },
                  })}
                  className="w-full rounded border p-2"
                />
              </label>

              <label className="mb-3 flex items-center gap-2">
                <BsLinkedin className="mr-2 inline-block text-2xl" />
                <input
                  type="url"
                  placeholder="Linkedin"
                  {...register("linkedLinkedin", {
                    onChange: () => {
                      setWebsite(null);
                    },
                  })}
                  className="w-full rounded border p-2"
                />
              </label>

              <label className="mb-3 flex items-center gap-2">
                <BsEnvelope className="mr-2 inline-block text-2xl" />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("linkedEmail", {
                    onChange: () => {
                      setWebsite(null);
                    },
                  })}
                  className="w-full rounded border p-2"
                />
              </label>
            </div>

            {!website && (
              <div className="mt-auto">
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded bg-blue-700 p-2"
                >
                  Generate Website
                </motion.button>
              </div>
            )}
          </form>

          {website && (
            <div className="mx-12 mt-auto flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onConfirm(website)}
                className="w-1/2 rounded bg-blue-700 p-2"
              >
                Save Website
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setWebsite(null)}
                className="w-1/2 rounded bg-red-700 p-2"
              >
                Cancel
              </motion.button>
            </div>
          )}
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
    include: {
      websites: true,
    },
  });

  if (user?.plan === "Beginner" && user.websites.length >= 1) {
    return {
      redirect: {
        destination: "/websites",
        permanent: false,
      },
    };
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};

export default WebsiteCreator;
