import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const Dashboard: NextPage = () => {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Dashboard</h1>
        <p className="mt-3 text-2xl">
          Welcome to the dashboard. You can view your QR codes and websites
          here.
        </p>
      </div>
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

  return {
    props: { session },
  };
};

export default Dashboard;
