import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CursorArrowRaysIcon,
  HomeIcon,
  QrCodeIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

import AuthButton from "./AuthButton";

const pages = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "QR Codes",
    href: "/qr-codes",
    icon: QrCodeIcon,
  },
  {
    name: "Websites",
    href: "/websites",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Account",
    href: "/account",
    icon: UserIcon,
  },
];

const Header = () => {
  const router = useRouter();
  const activePage = pages.find((page) => page.href === router.pathname);

  const { data: session, status } = useSession();

  return (
    <Popover className="relative z-10">
      <div className="mx-auto max-w-5xl px-6 sm:px-8 md:px-12">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="font-semibold hover:text-neutral-600"
            >
              <Link href="/">QLink</Link>
            </motion.button>
          </div>

          {status !== "loading" && session && (
            <div className="-my-2 -mr-2 hidden md:flex md:space-x-8">
              {pages.map((page) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={page.name}
                  className="font-semibold hover:text-neutral-600"
                >
                  <Link
                    href={page.href}
                    className={
                      activePage?.name === page.name
                        ? "text-blue-700"
                        : "text-neutral-100 hover:text-neutral-600"
                    }
                  >
                    {page.name}
                  </Link>
                </motion.button>
              ))}
            </div>
          )}

          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded bg-blue-700 p-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <AuthButton />
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-6 transition md:hidden"
        >
          <div className="divide-y-2 divide-neutral-50 rounded-lg bg-neutral-100 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-neutral-900">QLink</p>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded p-2 text-neutral-900 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              {status !== "loading" && session && (
                <>
                  <div className="mt-6">
                    <nav className="grid gap-y-8">
                      {pages.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center rounded p-3 hover:bg-neutral-50"
                        >
                          <item.icon
                            className="h-6 w-6 flex-shrink-0 text-blue-700"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-neutral-900">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </>
              )}
            </div>
            <div className="space-y-6 py-6 px-5">
              <div>
                <AuthButton mobile />
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;
