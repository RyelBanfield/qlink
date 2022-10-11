import { getProviders, signIn } from "next-auth/react";

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
            className="w-52 rounded-md bg-blue-700 p-2"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}

export default SignIn;
