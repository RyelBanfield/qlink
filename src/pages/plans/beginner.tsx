import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const BeginnerPlan: NextPage = () => {
  return (
    <>
      <h1>Beginner Plan</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default BeginnerPlan;
