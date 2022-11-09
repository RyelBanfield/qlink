import Card from "./Card";

const UserWebsites = () => {
  return (
    <>
      <h3 className="my-6 text-center text-xl font-bold text-neutral-100">
        Your QR Codes
      </h3>
      {user.qrCodes.length === 0 && (
        <Card>
          <p className="text-center font-medium text-neutral-900">
            You have not created any QR Codes yet.
          </p>
        </Card>
      )}
      {user.qrCodes.map((qrCode) => (
        <QRCodeCard key={qrCode.id} qrCode={qrCode} />
      ))}
    </>
  );
};

export default UserWebsites;
