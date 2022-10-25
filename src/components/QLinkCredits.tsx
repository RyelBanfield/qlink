import { User } from "@prisma/client";
import Link from "next/link";

const QLinkCredits = ({ user }: { user: User }) => {
  return (
    <div className="rounded-md bg-neutral-100 p-4">
      <h2 className="mb-3 text-center text-xl font-bold leading-none text-neutral-900">
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
          <button
            type="submit"
            className="w-44 rounded bg-blue-700 p-2 text-center font-semibold"
          >
            Purchase credit
          </button>
        </form>
      )}
      {user.credits > 0 && (
        <div className="flex flex-col items-center">
          <Link
            href="/creator"
            className="w-40 rounded bg-blue-700 p-2 text-center font-semibold"
          >
            Create QR code
          </Link>
        </div>
      )}
    </div>
  );
};

export default QLinkCredits;
