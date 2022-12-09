import { User, Website } from "@prisma/client";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
// import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { prisma } from "../../server/db/client";

const WebsiteCreator: NextPage<{ user: User }> = ({ user }) => {
  // const router = useRouter();
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
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-grow flex-col rounded bg-neutral-100 p-6">
        {/* Display */}
        <div className="mb-8 w-full sm:w-1/2">
          <div className="m-auto flex h-[450px] w-1/2 min-w-[220px] flex-col items-center rounded-3xl border-8 border-neutral-800 bg-neutral-100 pt-8">
            <Image
              src={
                website?.image && website.image.length > 0
                  ? website.image
                  : website?.name
                  ? `https://avatars.dicebear.com/api/initials/${website.name}.svg`
                  : `https://avatars.dicebear.com/api/initials/QLin.svg`
              }
              width={50}
              height={50}
              alt="Website Logo"
              className="mb-4 rounded-full"
            />
            <h1 className="font-bold text-neutral-900">
              {website?.name || "Name/Header"}
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="flex w-full flex-grow flex-col sm:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-12 flex flex-grow flex-col"
          >
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                onChange: () => {
                  setWebsite(null);
                },
              })}
              className="mb-4 rounded border-2 border-gray-900 p-2 text-neutral-900"
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
              className="mb-4 rounded border-2 border-gray-900 p-2 text-neutral-900"
            />

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
  });

  return {
    props: { user },
  };
};

export default WebsiteCreator;
