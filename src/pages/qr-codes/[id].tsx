import { QrCode } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";

import { prisma } from "../../server/db/client";

const QRCodePage: NextPage<{ qrCode: QrCode }> = ({ qrCode }) => {
  return (
    <>
      <div className="mt-3 flex h-min flex-col rounded bg-neutral-100 px-3 py-8 text-neutral-900">
        <h1 className="text-center text-2xl font-bold">{qrCode.name}</h1>
        <Link
          href={qrCode.url}
          className="text-center font-medium text-blue-800 hover:underline"
        >
          {qrCode.url}
        </Link>
      </div>
      <div className="flex flex-grow flex-col items-center justify-center">
        <Image src={qrCode.image} alt="QR Code" width={300} height={300} />
      </div>
      <a
        href={qrCode.image}
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
