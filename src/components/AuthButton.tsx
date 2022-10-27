import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = ({ mobile }: { mobile?: boolean }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session && !mobile) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => signOut()}
        className="font-semibold hover:text-gray-600"
      >
        Sign out
      </motion.button>
    );
  } else if (session && mobile) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => signOut()}
        className="flex w-full items-center justify-center rounded  border border-transparent bg-blue-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800"
      >
        Sign out
      </motion.button>
    );
  }

  return !mobile ? (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => signIn("auth0")}
      className="font-semibold text-blue-700 hover:text-blue-600"
    >
      Sign in
    </motion.button>
  ) : (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => signIn("auth0")}
      className="flex w-full items-center justify-center rounded  border border-transparent bg-blue-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800"
    >
      Sign in
    </motion.button>
  );
};

export default AuthButton;
