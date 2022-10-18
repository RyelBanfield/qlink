import { User } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps } from "next";
import Image from "next/future/image";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { prisma } from "../server/db/client";

type Inputs = { requestedURL: string };

const Creator = ({ user }: { user: User }) => {
  const [qrCode, setQrCode] = useState<{ url: string } | null>(null);
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axios
      .post("/api/qr-code", {
        user,
        requestedURL: data.requestedURL,
      })
      .then((res) => {
        setQrCode(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>QR Code Creator</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          defaultValue="https://ryelbanfield.me/"
          placeholder="URL"
          {...register("requestedURL", { required: true })}
          className="my-2 rounded-md border-2 border-gray-300 p-2 text-neutral-900"
        />
        <button type="submit" className="rounded-md bg-blue-700 p-2 text-white">
          Generate QR Code
        </button>
      </form>
      {qrCode && (
        <div className="relative m-auto flex h-64 w-64 items-center justify-center">
          <Image
            src={qrCode.url}
            alt="QR Code"
            fill
            className="my-3 rounded-md border-2 border-gray-300"
          />
        </div>
      )}
    </div>
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

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });

  if (user?.credits === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};

export default Creator;
