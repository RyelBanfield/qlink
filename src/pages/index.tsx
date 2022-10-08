import type { NextPage } from "next";
import Head from "next/head";

import { FAQ } from "../components/FAQ";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";
import { Footer } from "./../components/Footer";
import { Hero } from "./../components/Hero";
import { Navbar } from "./../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>QR Code Now</title>
        <meta
          name="description"
          content="Create your own QR codes to boost your business or idea."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-auto flex min-h-screen max-w-6xl flex-col px-6 sm:px-8 md:px-12">
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <Footer />
      </main>
    </>
  );
};

export default Home;
