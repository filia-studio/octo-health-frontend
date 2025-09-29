import React, { useState } from "react";
import { overview, recentItems, tabs } from "@/data";
import ScheduleTabs from "@/components/features/tabs/schedule-tabs";
import OverViewCard from "@/components/features/cards/overview";
import PatientsTable from "@/components/features/tables/patients-table";
import RecentSection from "@/components/features/pills/recent";

const HMSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Patients");
  return (
    <div className="px-4">
      <RecentSection items={recentItems} />
      <OverViewCard data={overview} />
      <ScheduleTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div>
        {activeTab === "Patients" && <PatientsTable patientData={[]} />}
      </div>
    </div>
  );
};

export default HMSchedule;
