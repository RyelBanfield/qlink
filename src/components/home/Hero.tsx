import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Hero = () => {
  const { data: session, status } = useSession();

  return (
    <section className="mb-6 flex flex-col-reverse sm:mb-12 sm:h-80 sm:flex-row sm:items-center sm:justify-between">
      <div className="sm:flex sm:h-full sm:w-6/12 sm:flex-col sm:justify-between">
        <h1 className="mb-6 text-center font-bold sm:text-left sm:text-2xl">
          Create your own QR codes to boost your business or idea.
        </h1>
        <p className="mb-6 text-center sm:text-left">
          QR codes are a great way to share information with your customers.
        </p>
        {status !== "loading" && !session && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => signIn("auth0")}
            className="w-full rounded bg-blue-800 p-2 text-center font-bold hover:bg-blue-600 sm:w-48"
          >
            Sign in
          </motion.button>
        )}

        {status !== "loading" && session && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full rounded bg-blue-800 p-2 text-center font-bold hover:bg-blue-600 sm:w-48"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </motion.button>
        )}
      </div>

      <div className="relative mb-6 h-40 w-full sm:mb-0 sm:h-full sm:w-5/12">
        <Image
          src="/hero.jpeg"
          alt="A woman scanning a QR code"
          fill
          priority={true}
          sizes="50vw"
          className="rounded object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
