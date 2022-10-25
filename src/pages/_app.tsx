import "../styles/globals.css";

import type { AppType } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
          content="Create your own QR codes & websites to boost your business or idea."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-grow flex-col p-6 sm:px-8 md:px-12">
        <Component {...pageProps} />
      </main>
      {router.pathname === "/" && <Footer />}
    </SessionProvider>
  );
};

export default MyApp;
