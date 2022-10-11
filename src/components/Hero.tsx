import Image from "next/future/image";

export function Hero({}) {
  return (
    <div className="flex h-96 items-center justify-between py-12">
      <div className="w-6/12">
        <h1 className="text-2xl font-bold">
          Create your own QR codes to boost your business or idea.
        </h1>
        <p className="py-6">
          QR codes are a great way to share information with your customers.
        </p>
        <button className="w-36 rounded-md bg-blue-700 p-2">Get Started</button>
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
}
