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
          <div className="flex w-full p-3 md:w-1/2">
            <div className="flex w-full flex-col space-y-6 rounded-md bg-gray-900 p-6 shadow-lg ">
              <div>
                <h4 className="text-2xl font-bold">Beginner</h4>
                <span className="text-6xl font-bold">Free</span>
              </div>
              <p className="mt-3 leading-relaxed dark:text-gray-400">
                Just getting started?
              </p>
              <ul className="mb-6 flex-1 dark:text-gray-400">
                <li className="mb-2 flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 text-blue-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>QR Code Generator</span>
                </li>
              </ul>
              <button
                type="button"
                className="inline-block rounded bg-blue-700 px-5 py-3 text-center font-semibold tracking-wider"
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="flex w-full p-3 md:w-1/2">
            <div className="flex w-full flex-col space-y-6 rounded bg-blue-700 p-6 shadow">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">Starter</h4>
                <span className="text-6xl font-bold">
                  $9
                  <span className="text-sm tracking-wide">/month</span>
                </span>
              </div>
              <p className="leading-relaxed">
                For those that need more features.
              </p>
              <ul className="flex-1 space-y-2">
                <Feature text="Everything in Free" />
                <Feature text="Website Builder" />
              </ul>
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-block w-full rounded bg-neutral-900 px-5 py-3 text-center font-bold tracking-wider"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
