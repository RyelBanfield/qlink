import { Website } from "@prisma/client";
import classnames from "classnames";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useState } from "react";
import {
  BsEnvelope,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

import { prisma } from "../server/db/client";

const EditWebsite: NextPage<{ website: Website }> = ({ website }) => {
  const [links] = useState({
    linkedWebsite:
      website.linkedWebsite !== ""
        ? {
            type: "Website",
            link: website.linkedWebsite,
            icon: <CgWebsite className="inline-block" />,
          }
        : null,
    linkedFacebook:
      website.linkedFacebook !== ""
        ? {
            type: "Facebook",
            link: website.linkedFacebook,
            icon: <BsFacebook className="inline-block" />,
          }
        : null,
    linkedInstagram:
      website.linkedInstagram !== ""
        ? {
            type: "Instagram",
            link: website.linkedInstagram,
            icon: <BsInstagram className="inline-block" />,
          }
        : null,
    linkedTwitter:
      website.linkedTwitter !== ""
        ? {
            type: "Twitter",
            link: website.linkedTwitter,
            icon: <BsTwitter className="inline-block" />,
          }
        : null,
    linkedLinkedin:
      website.linkedLinkedin !== ""
        ? {
            type: "Linkedin",
            link: website.linkedLinkedin,
            icon: <BsLinkedin className="inline-block" />,
          }
        : null,
    linkedEmail:
      website.linkedEmail !== ""
        ? {
            type: "Email",
            link: website.linkedEmail,
            icon: <BsEnvelope className="inline-block" />,
          }
        : null,
  });

  return (
    <>
      <div
        className={classnames(
          "absolute left-0 top-0 flex h-full w-full p-6 sm:px-8 md:px-12",
          {
            "bg-neutral-100 text-neutral-900": website.theme === "light",
            "bg-neutral-900 text-neutral-100": website.theme === "dark",
          }
        )}
      >
        <div className="m-auto flex h-full max-w-lg flex-grow flex-col items-center pt-12">
          <Image
            src={website.image}
            width={80}
            height={80}
            alt="Website Logo"
            className="mb-6 rounded-full"
          />

          <h1 className="mb-6 text-xl font-bold">{website.name}</h1>

          <div className="mb-6 flex w-full flex-col gap-3 px-6">
            {Object.entries(links).map(([key, value]) => {
              if (value) {
                return (
                  <div
                    key={key}
                    className="w-full rounded border p-3 text-center"
                  >
                    <a
                      href={
                        value.type !== "Email"
                          ? value.link
                          : `mailto: ${value.link}`
                      }
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
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const website = await prisma.website.findUnique({
    where: {
      name: context.params?.name as string,
    },
  });

  const isUserWebsiteOwner = website?.userId === session?.user?.id;

  if (!website || (website && !website.published && !isUserWebsiteOwner)) {
    return {
      notFound: true,
    };
  }

  return {
    props: { website: JSON.parse(JSON.stringify(website)) },
  };
};

export default EditWebsite;
