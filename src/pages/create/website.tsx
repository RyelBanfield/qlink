import { User, Website } from "@prisma/client";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { prisma } from "../../server/db/client";

const WebsiteCreator: NextPage<{ user: User }> = ({}) => {
  const { register, handleSubmit } = useForm<Website>();
  const [website, setWebsite] = useState<Website | null>(null);

  const onSubmit = (data: Website) => {
    console.log(data);
    setWebsite(data);
  };

  return (
    <>
      <div className="mb-6 flex min-h-[200px] flex-grow">
        <div className="grid flex-grow grid-cols-10 rounded bg-white">
          <div className="col-span-4 p-8">
            <div className="h-full rounded-3xl border-8 border-neutral-800 bg-black">
              <div>
                <h1>{website?.name}</h1>
              </div>
            </div>
          </div>
          <div className="col-span-6 p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex h-full flex-col"
            >
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="mb-2 rounded border-2 border-gray-300 p-2 text-neutral-900"
              />
              <input
                type="text"
                placeholder="Enter Name of Website"
                {...register("name", { required: false })}
                className="my-2 rounded border-2 border-gray-300 p-2 text-neutral-900"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="my-2 mt-auto rounded bg-blue-700 p-2"
              >
                Save
              </motion.button>
            </form>
          </div>
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
