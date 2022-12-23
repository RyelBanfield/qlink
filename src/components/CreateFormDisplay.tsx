import { Website } from "@prisma/client";
import Image from "next/image";

const CreateFormDisplay = ({ website }: { website: Website | null }) => {
  return (
    <>
      <div className="mb-8 w-full sm:w-1/2">
        <div className="m-auto flex h-[450px] w-1/2 min-w-[220px] flex-col items-center rounded-3xl border-8 border-neutral-800 bg-neutral-100 pt-8">
          <Image
            src={
              website?.image && website.image.length > 0
                ? website.image
                : website?.name
                ? `https://avatars.dicebear.com/api/initials/${website.name}.svg`
                : `https://avatars.dicebear.com/api/initials/QLin.svg`
            }
            width={50}
            height={50}
            alt="Website Logo"
            className="mb-4 rounded-full"
          />
          <h1 className="font-bold text-neutral-900">
            {website?.name || "Name/Header"}
          </h1>
        </div>
      </div>
    </>
  );
};

export default CreateFormDisplay;
