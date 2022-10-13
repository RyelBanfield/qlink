import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <button onClick={() => signOut()} className="font-semibold">
        Sign out
      </button>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="font-semibold">
      Sign in
    </button>
  );
};

export default AuthButton;
