import { signIn, signOut, useSession } from "next-auth/react";

export function LoginBtn({}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
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
      <button onClick={() => signIn("google")} className="">
        Sign in
      </button>
    </>
  );
}
