import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { prisma } from "../server/db/client";

type Inputs = { name: string; link: string };
type QRCode = { image: string; name: string; url: string };

const Creator: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();

  const [qrCode, setQrCode] = useState<QRCode | null>(null);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/qr-code/preview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setQrCode(data);
      })
      .catch((err) => console.log(err));
  };

  const onConfirm = (qrCode: QRCode) => {
    fetch("/api/qr-code/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        name: qrCode.name,
        link: qrCode.url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/qr-codes/${data.id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          placeholder="Enter Name of QR Code"
          {...register("name", { required: true })}
          className="my-2 rounded border-2 border-gray-300 p-2 text-neutral-900"
        />
        <input
          placeholder="Enter Link"
          {...register("link", { required: true })}
          className="my-2 rounded border-2 border-gray-300 p-2 text-neutral-900"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="my-2 rounded bg-blue-700 p-2"
        >
          Generate QR Code
        </motion.button>
      </form>

      {qrCode && (
        <div className="mt-8 flex flex-grow flex-col border-t-2 border-neutral-100">
          <div className="my-10 flex flex-col items-center justify-center">
            <h1 className="mb-2 text-2xl font-bold">{qrCode.name}</h1>
            <Link
              href={qrCode.url}
              className="mb-6 text-blue-800 hover:underline"
            >
              {qrCode.url}
            </Link>
            <Image src={qrCode.image} alt="QR Code" width={300} height={300} />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onConfirm(qrCode)}
            className="mt-auto mb-6 rounded bg-blue-700 p-2"
          >
            Use credit to save this QR Code
          </motion.button>
        </div>
      )}
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

  if (user && user.credits === 0) {
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
