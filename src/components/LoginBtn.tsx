import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function LoginBtn({}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className="">
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <Link href="/auth/signin">
        <a className="font-semibold">Sign in</a>
      </Link>
    </>
  );
}
