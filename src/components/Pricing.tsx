export function Pricing({}) {
  return (
    <section className="py-20 dark:bg-gray-800 dark:text-gray-100">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-bold uppercase tracking-wider dark:text-violet-400">
            Pricing
          </span>
          <h2 className="text-4xl font-bold lg:text-5xl">
            Choose your best plan
          </h2>
        </div>
        <div className="-mx-4 flex flex-wrap items-stretch">
          <div className="mb-8 flex w-full sm:px-4 md:w-1/2 lg:mb-0 lg:w-1/3">
            <div className="flex flex-col space-y-6 rounded p-6 shadow dark:bg-gray-900 sm:p-8">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">Beginner</h4>
                <span className="text-6xl font-bold">Free</span>
              </div>
              <p className="mt-3 leading-relaxed dark:text-gray-400">
                Etiam ac convallis enim, eget euismod dolor.
              </p>
              <ul className="mb-6 flex-1 dark:text-gray-400">
                <li className="mb-2 flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Aenean quis</span>
                </li>
                <li className="mb-2 flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Morbi semper</span>
                </li>
                <li className="mb-2 flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Tristique enim nec</span>
                </li>
              </ul>
              <button
                type="button"
                className="inline-block rounded px-5 py-3 text-center font-semibold tracking-wider dark:bg-violet-400 dark:text-gray-900"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="mb-8 flex w-full sm:px-4 md:w-1/2 lg:mb-0 lg:w-1/3">
            <div className="flex flex-col space-y-6 rounded p-6 shadow dark:bg-violet-400 dark:text-gray-900 sm:p-8">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">Pro</h4>
                <span className="text-6xl font-bold">
                  $24
                  <span className="text-sm tracking-wide">/month</span>
                </span>
              </div>
              <p className="leading-relaxed">
                Morbi cursus ut sapien sit amet consectetur.
              </p>
              <ul className="flex-1 space-y-2">
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
                  <span>Everything in Free</span>
                </li>
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
                  <span>Phasellus tellus</span>
                </li>
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
                  <span>Praesent faucibus</span>
                </li>
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
                  <span>Aenean et lectus blandit</span>
                </li>
              </ul>
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-block w-full rounded px-5 py-3 text-center font-bold tracking-wider dark:bg-gray-800 dark:text-violet-400"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="mb-8 w-full sm:px-4 md:w-1/2 lg:mb-0 lg:w-1/3">
            <div className="space-y-6 rounded p-6 shadow dark:bg-gray-900 sm:p-8">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">Team</h4>
                <span className="text-6xl font-bold">
                  $72
                  <span className="text-sm tracking-wide">/month</span>
                </span>
              </div>
              <p className="leading-relaxed dark:text-gray-400">
                Phasellus ultrices bibendum nibh in vehicula.
              </p>
              <ul className="space-y-2 dark:text-gray-400">
                <li className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Fusce sem ligula</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Curabitur dictum</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Duis odio eros</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 flex-shrink-0 dark:text-violet-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>Vivamus ut lectus ex</span>
                </li>
              </ul>
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-block w-full rounded px-5 py-3 text-center font-semibold tracking-wider dark:bg-violet-400 dark:text-gray-900"
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
