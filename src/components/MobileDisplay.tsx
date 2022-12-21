import { Website } from "@prisma/client";
import classNames from "classnames";
import Image from "next/image";

const MobileDisplay = ({
  theme,
  website,
  links,
}: {
  theme: string;
  website: Website;
  links: {
    linkedWebsite: {
      type: string;
      link: string;
      icon: JSX.Element;
    } | null;
    linkedFacebook: {
      type: string;
      link: string;
      icon: JSX.Element;
    } | null;
    linkedInstagram: {
      type: string;
      link: string;
      icon: JSX.Element;
    } | null;
    linkedTwitter: {
      type: string;
      link: string;
      icon: JSX.Element;
    } | null;
    linkedLinkedin: {
      type: string;
      link: string;
      icon: JSX.Element;
    } | null;
    linkedEmail: {
      type: string;
      link: string;
      icon: JSX.Element;
    } | null;
  };
}) => {
  return (
    <div
      className={classNames(
        "mx-auto mb-6 flex h-[450px] w-1/2 min-w-[220px] max-w-[250px] flex-col items-center rounded-3xl border-8 border-neutral-800 pt-8",
        {
          "bg-neutral-100 text-neutral-900": theme === "light",
          "bg-neutral-900 text-neutral-100": theme === "dark",
        }
      )}
    >
      <Image
        src={website.image}
        width={50}
        height={50}
        alt="Website Logo"
        className="mb-3 rounded-full"
      />

      <h1 className="mb-6 font-bold">{website.name}</h1>

      <div className="flex w-full flex-col gap-2 px-6">
        {Object.entries(links).map(([key, value]) => {
          if (value) {
            return (
              <div key={key} className="w-full rounded border p-2 text-center">
                <a
                  href={value.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center gap-2"
                >
                  {value.icon}
                  <span className="text-center">{value.type}</span>
                </a>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default MobileDisplay;
