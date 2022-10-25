import { User } from "@prisma/client";
import axios from "axios";
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axios
      .post("/api/qr-code/preview", {
        name: data.name,
        link: data.link,
      })
      .then((res) => {
        setQrCode(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onConfirm = async (qrCode: QRCode) => {
    axios
      .post("/api/qr-code/create", {
        user,
        name: qrCode.name,
        link: qrCode.url,
      })
      .then((res) => {
        router.push(`/qr-codes/${res.data.id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          placeholder="Enter Name of QR Code"
          {...register("name", { required: true })}
          className="my-2 rounded-md border-2 border-gray-300 p-2 text-neutral-900"
        />
        <input
          placeholder="Enter Link"
          {...register("link", { required: true })}
          className="my-2 rounded-md border-2 border-gray-300 p-2 text-neutral-900"
        />
        <button
          type="submit"
          className="my-2 rounded-md bg-blue-700 p-2 text-white"
        >
          Generate QR Code
        </button>
      </form>
      {qrCode && (
        <div className="mt-8 flex flex-grow flex-col border-t-2 border-neutral-100 pt-8">
          <div className="mb-6 flex flex-grow flex-col items-center justify-center">
            <h1 className="mb-3 text-xl font-bold">{qrCode.name}</h1>
            <Link href={qrCode.url}>
              <a className="mb-6 hover:underline">{qrCode.url}</a>
            </Link>
            <Image src={qrCode.image} alt="QR Code" width={300} height={300} />
          </div>
          <button
            className="mt-auto mb-6 w-full rounded-md bg-blue-700 p-2 text-white"
            onClick={() => onConfirm(qrCode)}
          >
            Use credit to save this QR Code
          </button>
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
