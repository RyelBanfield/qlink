import { NextPage } from "next";

const Dashboard: NextPage = () => {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Dashboard</h1>
        <p className="mt-3 text-2xl">
          Welcome to the dashboard. You can view your QR codes and websites
          here.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
