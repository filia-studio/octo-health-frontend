import React, { useState } from "react";
import RecentSection from "./recent-section";
import { recentItems, tabs } from "@/data";
import OverViewSection from "./overview-section";
import ScheduleTabs from "./tabs";
import PatientsTable from "./tabs/patients-table";

const HMSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Patients");
  return (
    <>
      <RecentSection items={recentItems} />
      <OverViewSection />
      <ScheduleTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="pr-[64px]">
        {activeTab === "Patients" && <PatientsTable />}
      </div>
    </>
  );
};

export default HMSchedule;
