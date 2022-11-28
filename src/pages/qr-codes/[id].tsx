import { QrCode } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";

import { prisma } from "../../server/db/client";

const QRCodePage: NextPage<{ qrCode: QrCode }> = ({ qrCode }) => {
  return (
    <>
      <div className="mt-3 flex h-min flex-col rounded bg-neutral-100 px-3 py-8 text-neutral-900">
        <h1 className="text-center text-2xl font-bold">{qrCode.name}</h1>
        <a
          href={qrCode.url}
          target="_blank"
          className="text-center font-medium text-blue-800 hover:underline"
          rel="noreferrer"
        >
          {qrCode.url}
        </a>
      </div>

      <div className="my-6 flex flex-grow flex-col items-center justify-center">
        <Image
          alt="QR Code"
          src={qrCode.qrCodeImage}
          width={300}
          height={300}
          className="border-8 border-white"
        />
      </div>

      <a
        href={qrCode.qrCodeImage}
        download={`${qrCode.name}.png`}
        className="mt-auto mb-6 w-full rounded bg-blue-700 p-2 text-center font-bold"
      >
        Download PNG
      </a>
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

  const qrCode = await prisma.qrCode.findUnique({
    where: {
      id: context.query.id as string,
    },
  });

  return {
    props: { qrCode: JSON.parse(JSON.stringify(qrCode)) },
  };
};

export default QRCodePage;
