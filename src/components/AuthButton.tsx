import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="font-semibold hover:text-gray-600"
      >
        Sign out
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("auth0")}
      className="font-semibold text-blue-700 hover:text-blue-600"
    >
      Sign in
    </button>
  );
};

export default AuthButton;
