import { PrismaClient, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

type Props = { user: User };

const Dashboard = ({ user }: Props) => {
  const [credits, setCredits] = useState(user.credits);

  const handleCreateQRCode = async () => {
    fetch("/api/qr-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        creditsUsed: 1,
      }),
    });
    setCredits(credits - 1);
    console.log("QR Code created");
  };

  return (
    <>
      <section className="mt-3 flex h-min flex-col rounded-md bg-neutral-100 px-3 py-8">
        <h2 className="mb-4 text-center text-3xl font-bold leading-none text-neutral-900 sm:text-3xl">
          You have <span className="text-blue-700">{credits}</span> QLink Credit
          {user.credits === 1 ? "" : "s"}
        </h2>
        {user.credits === 0 && (
          <form
            action="/api/checkout/credits"
            method="POST"
            className="flex flex-col items-center"
          >
            <button
              type="submit"
              className="w-44 rounded bg-blue-700 p-2 text-center font-semibold"
            >
              Purchase credits
            </button>
          </form>
        )}
        {user.credits > 0 && (
          <div
            className="flex flex-col items-center"
            onClick={handleCreateQRCode}
          >
            <button className="w-44 rounded bg-blue-700 p-2 text-center font-semibold">
              Create a QLink
            </button>
          </div>
        )}
      </section>
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

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
  });

  return {
    props: { user },
  };
};

export default Dashboard;
