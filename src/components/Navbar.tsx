import Link from "next/link";

import { LoginBtn } from "./LoginBtn";

export function Navbar({}) {
  return (
    <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 sm:px-8 md:px-12">
      <Link href="/">
        <a className="text-xl font-semibold">QLink</a>
      </Link>

      <LoginBtn />
    </nav>
  );
}
