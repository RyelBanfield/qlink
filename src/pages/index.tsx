import { NextPage } from "next";

import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Hero from "./../components/Hero";

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
