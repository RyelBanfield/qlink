import { NextPage } from "next";

import FAQ from "../components/home/FAQ";
import Features from "../components/home/Features";
import Hero from "../components/home/Hero";
import Pricing from "../components/home/Pricing";

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

export default Home;
