import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { FAQ } from "../components/FAQ";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";
import { Hero } from "./../components/Hero";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") router.push("/dashboard");

  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
    </>
  );
};

export default Home;
