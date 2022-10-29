import { Prisma } from "@prisma/client";

import QRCodeCard from "./QRCodeCard";

const userWithQRCodes = Prisma.validator<Prisma.UserArgs>()({
  include: {
    qrCodes: true,
  },
});

type UserWithQrCodes = Prisma.UserGetPayload<typeof userWithQRCodes>;

const UserQRCodes = ({ user }: { user: UserWithQrCodes }) => {
  return (
    <>
      <h2 className="my-6 text-center text-xl font-bold text-neutral-100">
        Your QR Codes
      </h2>
      {user.qrCodes.length === 0 && (
        <div className="rounded bg-neutral-100 p-4">
          <p className="text-center font-medium text-neutral-900">
            You have not created any QR Codes yet.
          </p>
        </div>
      )}
      {user.qrCodes.map((qrCode) => (
        <QRCodeCard key={qrCode.id} qrCode={qrCode} />
      ))}
    </>
  );
};

export default UserQRCodes;
