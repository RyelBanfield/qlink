import Head from "next/head";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
        <meta name="description" content="404 - Not Found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-grow flex-col items-center justify-center">
        <h2 className="mb-8 text-6xl font-extrabold">404</h2>
        <p className="mb-8 text-2xl font-semibold md:text-3xl">
          Sorry, we couldn&apos;t find this page.
        </p>
        <Link href="/">
          <a className="w-40 rounded bg-blue-700 p-2 text-center">
            Back to homepage
          </a>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
