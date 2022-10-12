import Link from "next/link";

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-6 w-6 flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span>{text}</span>
    </li>
  );
}

function Plan({
  name,
  price,
  monthly,
  description,
  features,
  href,
  bgColor,
  buttonColor,
  buttonText,
}: {
  name: string;
  price: string;
  monthly: boolean;
  description: string;
  features: string[];
  href: string;
  bgColor: string;
  buttonColor: string;
  buttonText: string;
}) {
  const cardClasses = `flex w-full flex-col space-y-6 rounded-md p-6 shadow-lg ${bgColor}`;
  const buttonClasses = `inline-block w-full rounded px-5 py-3 text-center font-bold tracking-wider ${buttonColor}`;

  return (
    <div className="flex w-full p-3 md:w-1/2 lg:w-1/3">
      <div className={cardClasses}>
        <div>
          <h4 className="text-2xl font-bold">{name}</h4>
          <span className="text-6xl font-bold">
            {price}
            {monthly === false ? (
              ""
            ) : (
              <span className="text-sm tracking-wide">/month</span>
            )}
          </span>
        </div>
        <p className="mt-3 leading-relaxed">{description}</p>
        <ul className="flex-1 space-y-2">
          {features.map((feature) => (
            <Feature key={feature} text={feature} />
          ))}
        </ul>
        <Link href={href}>
          <a className={buttonClasses}>{buttonText}</a>
        </Link>
      </div>
    </div>
  );
}

export function Pricing({}) {
  return (
    <section className="mb-12 rounded-md bg-neutral-100 px-6 py-12">
      <div>
        <div className="mx-auto mb-10 text-center">
          <span className="font-bold uppercase tracking-wider text-blue-700">
            Pricing
          </span>
          <h2 className="mt-2 text-3xl font-bold leading-none text-neutral-900 sm:text-3xl">
            Choose your best plan
          </h2>
        </div>

        <div className="flex flex-wrap">
          <Plan
            name="Beginner"
            price="$5"
            monthly={false}
            description="Just getting started?"
            features={["1 QR Code"]}
            href="/plans/beginner"
            bgColor="bg-gray-900"
            buttonColor="bg-blue-700"
            buttonText="Get Started"
          />
          <Plan
            name="Starter"
            price="$25"
            monthly={true}
            description="For those that need more."
            features={["Unlimited QR Codes", "1 QLink Website"]}
            href="/"
            bgColor="bg-blue-700"
            buttonColor="bg-gray-900"
            buttonText="Coming Soon"
          />
          <Plan
            name="Pro"
            price="$50"
            monthly={true}
            description="For the entrepreneurs."
            features={["Unlimited QR Codes", "Unlimited QLink Websites"]}
            href="/"
            bgColor="bg-gray-900"
            buttonColor="bg-blue-700"
            buttonText="Coming Soon"
          />
        </div>
      </div>
    </section>
  );
}
