import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
        <meta name="description" content="404 - Not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-grow flex-col items-center justify-center">
        <p className="mb-8 text-6xl font-extrabold">404</p>
        <h1 className="mb-8 text-2xl font-semibold md:text-3xl">
          Sorry, we couldn&apos;t find this page.
        </h1>
        <Link href="/" className="w-40 rounded bg-blue-700 p-2 text-center">
          Back to homepage
        </Link>
      </div>
    </>
  );
};

export default Custom404;
