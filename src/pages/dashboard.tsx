import { PrismaClient, User } from "@prisma/client";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

type Props = { user: User };

const Dashboard = ({ user }: Props) => {
  return (
    <>
      <section className="mt-3 flex h-min flex-col rounded-md bg-neutral-100 px-3 py-8">
        <h2 className="mb-4 text-center text-3xl font-bold leading-none text-neutral-900 sm:text-3xl">
          You have <span className="text-blue-700">{user.credits}</span> QLink
          Credit{user.credits === 1 ? "" : "s"}
        </h2>
        {user.credits === 0 && (
          <form
            action="/api/checkout_sessions"
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
