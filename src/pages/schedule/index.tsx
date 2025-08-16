import PageLayout from "@/layout";
import React, { useState } from "react";
import RecentSection from "./recent-section";
import OverViewSection from "./overview-section";
import { recentItems, tabs } from "@/data";
import ScheduleTabs from "./tabs";
import PatientsTable from "./tabs/patients-table";

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Patients");
  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default Schedule;
