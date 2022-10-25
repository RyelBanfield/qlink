import { QrCode } from "@prisma/client";
import Link from "next/link";

const QRCodeCard = ({ qrCode }: { qrCode: QrCode }) => {
  return (
    <div className="mb-6 flex flex-col rounded-md bg-neutral-100 p-4 sm:flex-row sm:justify-between">
      <div className="mb-3 flex flex-col">
        <h4 className="text-lg font-semibold text-neutral-900">
          {qrCode.name}
        </h4>
        <a
          href={qrCode.url}
          target="_blank"
          className="text-neutral-900 hover:underline"
          rel="noreferrer"
        >
          {qrCode.url}
        </a>
      </div>
      <Link
        href={`/qr-codes/${qrCode.id}`}
        className="w-full rounded bg-blue-700 p-2 text-center font-semibold sm:w-32 sm:p-4"
      >
        View
      </Link>
    </div>
  );
};

export default QRCodeCard;
