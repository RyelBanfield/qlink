import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => signOut()}
        className="font-semibold hover:text-gray-600"
      >
        Sign out
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => signIn("auth0")}
      className="font-semibold text-blue-700 hover:text-blue-600"
    >
      Sign in
    </motion.button>
  );
};

export default AuthButton;
