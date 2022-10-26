import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

import AuthButton from "./AuthButton";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="mx-auto flex w-full max-w-5xl items-center justify-between p-6 sm:px-8 md:px-12">
      <div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="font-semibold hover:text-gray-600"
        >
          <Link href="/">QLink</Link>
        </motion.button>
        {router.pathname !== "/" && (
          <span className="ml-2 text-sm text-gray-500">
            |{" "}
            {router.pathname.slice(1).charAt(0).toUpperCase() +
              router.pathname
                .slice(2)
                .replace("r-c", "RC")
                .replace("/[id]", "")}
          </span>
        )}
      </div>

      <AuthButton />
    </nav>
  );
};

export default Navbar;
