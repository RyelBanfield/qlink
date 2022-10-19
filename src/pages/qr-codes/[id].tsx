import { QrCode } from "@prisma/client";
import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Link from "next/link";
import { getSession } from "next-auth/react";

import { prisma } from "../../server/db/client";

const QRCodePage = ({ qrCode }: { qrCode: QrCode }) => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <h1 className="mb-3 text-3xl font-semibold">{qrCode.name}</h1>
      <Link href={qrCode.url}>
        <a className="mb-6 text-lg hover:underline">{qrCode.url}</a>
      </Link>
      <Image src={qrCode.image} alt="QR Code" width={300} height={300} />
      <a
        href={qrCode.image}
        download={`${qrCode.name}.png`}
        className="mt-6 w-48 rounded bg-blue-700 p-2 text-center font-bold"
      >
        Download PNG
      </a>
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
