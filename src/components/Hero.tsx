import Image from "next/future/image";
import { signIn } from "next-auth/react";

const Hero = () => {
  return (
    <div className="flex h-96 items-center justify-between py-12">
      <div className="w-6/12">
        <h1 className="text-2xl font-bold">
          Create your own QR codes to boost your business or idea.
        </h1>
        <p className="py-6">
          QR codes are a great way to share information with your customers.
        </p>
        <button
          onClick={() => signIn()}
          className="inline-block w-48 rounded bg-blue-700 p-2 text-center font-bold hover:bg-blue-600"
        >
          Sign up
        </button>
      </div>

      <div className="relative h-full w-5/12">
        <Image
          src="/hero.jpeg"
          alt="A woman scanning a QR code"
          fill
          priority={true}
          sizes="50vw"
          className="rounded object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
