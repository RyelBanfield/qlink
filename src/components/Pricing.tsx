const Feature = ({ text }: { text: string }) => {
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
};

const Plan = ({
  name,
  price,
  monthly,
  description,
  features,
  bgColor,
}: {
  name: string;
  price: string;
  monthly: boolean;
  description: string;
  features: string[];
  bgColor: string;
}) => {
  const cardClasses = `flex w-full flex-col space-y-6 rounded p-4 sm:p-6 shadow-lg ${bgColor}`;

  return (
    <div className="flex h-80 w-full p-3 md:h-96 md:w-[32%] md:p-0">
      <div className={cardClasses}>
        <div>
          <h4 className="text-xl font-bold">{name}</h4>
          <span className="text-2xl font-bold">
            {price}
            {monthly === false ? (
              ""
            ) : (
              <span className="text-sm tracking-wide">/month</span>
            )}
          </span>
        </div>
        <p>{description}</p>
        <ul className="flex-1 space-y-2">
          {features.map((feature) => (
            <Feature key={feature} text={feature} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <section className="mb-6 rounded bg-neutral-100 px-6 py-12 sm:mb-12">
      <div className="mb-6 text-center">
        <span className="font-bold uppercase tracking-wider text-blue-700 sm:text-lg">
          Pricing
        </span>
        <h2 className="text-2xl font-bold leading-none text-neutral-900 sm:text-3xl">
          Choose your best plan
        </h2>
      </div>

      <div className="flex flex-wrap sm:grid-cols-3 sm:justify-between">
        <Plan
          name="Beginner"
          price="$10"
          monthly={false}
          description="For those just getting started."
          features={["1 QR Code"]}
          bgColor="bg-gray-900"
        />
        <Plan
          name="Starter"
          price="Coming Soon"
          monthly={false}
          description="For those that need more."
          features={["Unlimited QR Codes", "1 QLink Website"]}
          bgColor="bg-blue-700"
        />
        <Plan
          name="Pro"
          price="Coming Soon"
          monthly={false}
          description="For the entrepreneurs."
          features={["Unlimited QR Codes", "Unlimited QLink Websites"]}
          bgColor="bg-gray-900"
        />
      </div>
    </section>
  );
};

export default Pricing;
