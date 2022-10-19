import { QrCode } from "@prisma/client";
import Link from "next/link";

const QRCodeCard = ({ qrCode }: { qrCode: QrCode }) => {
  return (
    <div className="mb-3 flex justify-between rounded-md bg-neutral-100 p-6">
      <div className="flex flex-col">
        <h4 className="text-xl font-semibold text-neutral-900">
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
      <Link href={`/qr-codes/${qrCode.id}`}>
        <a className="my-2 rounded-md bg-blue-700 p-2 px-6 text-white">View</a>
      </Link>
    </div>
  );
};

export default QRCodeCard;
