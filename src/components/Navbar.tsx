import Link from "next/link";

import { LoginBtn } from "./LoginBtn";

export function Navbar({}) {
  return (
    <nav className="flex h-16 items-center justify-between px-6 sm:px-8 md:px-12">
      <div className="">
        <Link href="/">
          <a className="text-xl font-semibold">QLink</a>
        </Link>
      </div>

      <div className="">
        <LoginBtn />
      </div>
    </nav>
  );
}
