import { Website } from "@prisma/client";
import classnames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const WebsiteCard = ({ website }: { website: Website }) => {
  const [published, setPublished] = useState<boolean>(website.published);

  const handlePublishing = () => {
    fetch("/api/website/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: website.id,
        published: !published,
      }),
    });
    setPublished(!published);
  };

  return (
    <div className="mb-6 flex flex-col rounded bg-neutral-100 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-3 flex gap-3 sm:mb-0">
        <Image
          src={website.image}
          alt={website.name}
          width={50}
          height={50}
          className="w-16 rounded-full"
        />
        <div>
          <h4 className="text-lg font-semibold text-neutral-900">
            {website.name}
          </h4>
          <a
            href={website.url}
            target="_blank"
            className="text-blue-900 hover:underline"
            rel="noreferrer"
          >
            {website.url}
          </a>
        </div>
        <div className="ml-auto">
          <p
            className={classnames("text-sm font-semibold", {
              "text-green-700": published,
              "text-red-700": !published,
            })}
          >
            {published ? "Published" : "Not Published"}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="h-12 w-full rounded bg-blue-700 text-center font-semibold sm:w-44"
        >
          <Link
            href={`/${website.name}`}
            className="flex h-full w-full items-center justify-center"
          >
            View
          </Link>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="h-12 w-full rounded bg-blue-700 text-center font-semibold sm:w-44"
        >
          <Link
            href={`/edit/website/${website.id}`}
            className="flex h-full w-full items-center justify-center"
          >
            Edit
          </Link>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePublishing}
          className="h-12 w-full rounded bg-blue-700 text-center font-semibold sm:w-44"
        >
          {published ? "Unpublish" : "Publish"}
        </motion.button>
      </div>
    </div>
  );
};

export default WebsiteCard;
