import React from "react";
import Sidebar from "../nav/hospital-mgmt/sidebar";
import Header from "../nav/hospital-mgmt/header";
import { Outlet } from "react-router-dom";

const HospitalMgmtLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="w-[calc(100vw-16rem)] flex flex-col">
        <Header />
        <main className="pl-[64px] py-[32px] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HospitalMgmtLayout;
