import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { prisma } from "../../server/db/client";

type Inputs = { name: string; url: string; image?: string };

const QRCreator: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [qrCode, setQrCode] = useState<Inputs | null>(null);
  const [showingConfirmation, setShowingConfirmation] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.image && data.image.length > 0) {
      const reader = new FileReader();
      const blob = new Blob([data.image[0] as BlobPart], {
        type: "image/png",
      });
      reader.readAsDataURL(blob);

      reader.onload = () => {
        setQrCode({
          name: data.name,
          url: data.url,
          image: reader.result as string,
        });
      };

      return;
    }

    setQrCode({ name: data.name, url: data.url });
  };

  const onConfirm = (qrCode: Inputs) => {
    const qrCodeCanvas = document.querySelector("canvas");
    const qrCodeImage = qrCodeCanvas?.toDataURL("image/png");

    fetch("/api/qr-code/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        name: qrCode.name,
        url: qrCode.url,
        image: qrCode.image || null,
        qrCodeImage,
      }),
    })
      .then((res) => res.json())
      .then((data) => router.push(`/qr-codes/${data.id}`))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {user.credits === 0 && (
        <div className="mb-6 flex flex-col items-center justify-center">
          <h1 className="text-center font-bold text-red-700">
            You won&apos;t be able to save or download your QR Code without a
            credit.
          </h1>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          type="text"
          placeholder="Enter Name of QR Code"
          {...register("name", { required: true, minLength: 3, maxLength: 20 })}
          className="my-2 rounded border-2 border-gray-300 p-2 text-neutral-900 placeholder:italic placeholder:text-slate-400"
        />
        {errors.name && (
          <p className="text-sm text-red-700">
            Name should be between 3 and 20 characters.
          </p>
        )}

        <input
          type="url"
          placeholder="Enter Link"
          {...register("url", { required: true })}
          className="my-2 rounded border-2 border-gray-300 p-2 text-neutral-900 placeholder:italic placeholder:text-slate-400"
        />

        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="my-2 block w-full text-sm text-slate-400 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
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
            <p className="mb-2 text-2xl font-bold">{qrCode.name}</p>

            <Link
              href={qrCode.url}
              className="mb-6 text-blue-800 hover:underline"
            >
              {qrCode.url}
            </Link>

            {!qrCode.image && (
              <QRCodeCanvas
                value={qrCode.url}
                size={300}
                level={"Q"}
                style={{ border: "8px solid #FFF" }}
              />
            )}

            {qrCode.image && (
              <QRCodeCanvas
                value={qrCode.url}
                size={300}
                level={"Q"}
                style={{ border: "8px solid #FFF" }}
                imageSettings={{
                  src: qrCode.image,
                  height: 50,
                  width: 50,
                  excavate: true,
                }}
              />
            )}
          </div>

          {user.credits <= 0 ? (
            <form
              action="/api/checkout/credits"
              method="POST"
              className="flex flex-col items-center"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-auto mb-6 w-full rounded bg-red-700 p-2"
              >
                Purchase Credit
              </motion.button>
            </form>
          ) : (
            <>
              {!showingConfirmation ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowingConfirmation(true)}
                  className="mt-auto mb-6 rounded bg-blue-700 p-2"
                >
                  Save QR Code
                </motion.button>
              ) : (
                <div className="mb-6 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onConfirm(qrCode)}
                    className="mt-auto w-1/2 rounded bg-blue-700 p-2"
                  >
                    Use Credit
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowingConfirmation(false)}
                    className="mt-auto w-1/2 rounded bg-red-700 p-2"
                  >
                    Cancel
                  </motion.button>
                </div>
              )}
            </>
          )}
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

  return {
    props: { user },
  };
};

export default QRCreator;
