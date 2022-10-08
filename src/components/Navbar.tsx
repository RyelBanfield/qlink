import Link from "next/link";

import { LoginBtn } from "./LoginBtn";

export function Navbar({}) {
  return (
    <nav className="flex h-16 items-center justify-between">
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
