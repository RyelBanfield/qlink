import { User } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";

import Card from "./Card";

const QLinkCredits = ({ user }: { user: User }) => {
  return (
    <Card>
      <h1 className="mb-6 text-center text-xl font-bold leading-none text-neutral-900">
        You have <span className="text-blue-700">{user.credits}</span> Credit
        {user.credits === 1 ? "" : "s"}
      </h1>
      {user.credits === 0 && (
        <form
          action="/api/checkout/credits"
          method="POST"
          className="flex flex-col items-center"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="h-12 w-44 rounded bg-blue-700 text-center font-semibold"
          >
            Purchase credit
          </motion.button>
        </form>
      )}
      {user.credits > 0 && (
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="h-12 w-44 rounded bg-blue-700 text-center font-semibold"
          >
            <Link
              href="/creator"
              className="flex h-full w-full items-center justify-center"
            >
              Create QR Code
            </Link>
          </motion.button>
        </div>
      )}
    </Card>
  );
};

export default QLinkCredits;
