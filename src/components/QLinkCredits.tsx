import { User } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";

const QLinkCredits = ({ user }: { user: User }) => {
  return (
    <div className="rounded bg-neutral-100 p-4">
      <h2 className="mb-6 text-center text-xl font-bold leading-none text-neutral-900">
        You have <span className="text-blue-700">{user.credits}</span> QLink
        Credit
        {user.credits === 1 ? "" : "s"}
      </h2>
      {user.credits === 0 && (
        <form
          action="/api/checkout/credits"
          method="POST"
          className="flex flex-col items-center"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-44 rounded bg-blue-700 p-2 text-center font-semibold"
          >
            Purchase credit
          </motion.button>
        </form>
      )}
      {user.credits > 0 && (
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-44 rounded bg-blue-700 p-2 text-center font-semibold"
          >
            <Link href="/creator">Create QR code</Link>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default QLinkCredits;
