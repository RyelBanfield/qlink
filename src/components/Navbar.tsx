import Link from "next/link";

import { LoginBtn } from "./LoginBtn";

export function Navbar({}) {
  return (
    <nav className="flex h-16 items-center justify-between">
      <div className="">
        <Link href="/">
          <a className="text-xl font-semibold">QR Code Now</a>
        </Link>
      </div>

      <div className="">
        <LoginBtn />
      </div>
    </nav>
  );
}
