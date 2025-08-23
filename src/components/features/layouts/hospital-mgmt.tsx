import React, { useState } from "react";
import Header from "../nav/hospital-mgmt/header";
import { Outlet } from "react-router-dom";
import Sidebar from "../nav/sidebar";
import { DashboardModule } from "@/types/common";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/icons";

const HospitalMgmtLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={isOpen}
        toggle={toggleSidebar}
        module={DashboardModule.Hospital}
        logo={<LogoIcon />}
      />
      <section
        className={cn(
          "w-full h-full overflow-auto flex flex-col",
          {
            "w-full": isOpen,
            "lg:w-[80%]": !isOpen,
          }
        )}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="py-8 max-w-[75.5rem] mx-auto w-full">
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default HospitalMgmtLayout;
