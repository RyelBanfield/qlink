import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { FAQ } from "../components/FAQ";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";
import { Footer } from "./../components/Footer";
import { Hero } from "./../components/Hero";
import { Navbar } from "./../components/Navbar";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") router.push("/dashboard");

  return (
    <>
      <Head>
        <title>QLink</title>
        <meta
          name="description"
          content="Create your own QR codes & websites to boost your business or idea."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
