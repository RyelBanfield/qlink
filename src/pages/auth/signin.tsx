import { GetServerSideProps } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";

const SignIn = ({
  providers,
}: {
  providers: {
    [key: string]: { name: string; id: string };
  };
}) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div
          key={provider.name}
          className="flex flex-grow flex-col items-center justify-center"
        >
          <button
            onClick={() => signIn(provider.id)}
            className="w-44 rounded-sm bg-blue-700 p-2"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers, session },
  };
};

export default SignIn;
