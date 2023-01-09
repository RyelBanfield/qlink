import "../styles/globals.css";

import { motion } from "framer-motion";
import type { AppType } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import Header from "../components/Header";
import Footer from "../components/home/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <title>QLink</title>
        <meta
          name="description"
          content="Create your own QR codes & websites to share your business or socials."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!router.pathname.includes("/[name]") && <Header />}
      <motion.main
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
        className="mx-auto flex w-full max-w-5xl flex-grow flex-col p-6 sm:px-8 md:px-12"
      >
        <Component {...pageProps} />
      </motion.main>
      {router.pathname === "/" && <Footer />}
    </SessionProvider>
  );
};

export default MyApp;
