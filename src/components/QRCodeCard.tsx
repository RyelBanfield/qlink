import { QrCode } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";

const QRCodeCard = ({ qrCode }: { qrCode: QrCode }) => {
  return (
    <div className="mb-6 flex flex-col rounded bg-neutral-100 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="mb-3 sm:mb-0">
        <h4 className="text-lg font-semibold text-neutral-900">
          {qrCode.name}
        </h4>
        <a
          href={qrCode.url}
          target="_blank"
          className="text-blue-900 hover:underline"
          rel="noreferrer"
        >
          {qrCode.url}
        </a>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="h-12 w-full rounded bg-blue-700 p-2 text-center font-semibold sm:w-44"
      >
        <Link href={`/qr-codes/${qrCode.id}`} className="inline-block w-full">
          View
        </Link>
      </motion.button>
    </div>
  );
};

export default QRCodeCard;
