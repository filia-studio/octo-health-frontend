import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="w-[calc(100vw-16rem)] flex flex-col">
        <Header />
        <main className="pl-[64px] py-[32px] overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
