import Link from "next/link";
import { useRouter } from "next/router";

import AuthButton from "./AuthButton";

const Navbar = ({}) => {
  const router = useRouter();

  return (
    <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 sm:px-8 md:px-12">
      <div>
        <Link href="/">
          <a className="text-xl font-semibold">QLink</a>
        </Link>
        {router.pathname !== "/" && (
          <span className="ml-2 text-sm text-gray-500">
            |{" "}
            {router.pathname.slice(1).charAt(0).toUpperCase() +
              router.pathname.slice(2)}
          </span>
        )}
      </div>

      <AuthButton />
    </nav>
  );
};

export default Navbar;
