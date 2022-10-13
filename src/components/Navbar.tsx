import Link from "next/link";

import AuthButton from "./AuthButton";

const Navbar = ({}) => {
  return (
    <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 sm:px-8 md:px-12">
      <Link href="/">
        <a className="text-xl font-semibold">QLink</a>
      </Link>

      <AuthButton />
    </nav>
  );
};

export default Navbar;
