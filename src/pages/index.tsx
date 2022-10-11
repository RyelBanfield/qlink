import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

import { FAQ } from "../components/FAQ";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";
import { Hero } from "./../components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
