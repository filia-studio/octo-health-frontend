import React, { useState } from "react";
import ScheduleTabs from "@/components/features/tabs/schedule-tabs";
import OverViewCard from "@/components/features/cards/overview";
import SubscribersTable from "@/components/features/tables/subscribers-table";

export const tabs = ["Subscribers", "Claims", "Plans", "Network"];
export const overview = [
  {
    label: "Total Subscribers",
    value: "1300",
    // change: "5%",
    // changeColor: "text-green-600",
  },
  {
    label: "Total Claims",
    value: "1000",
    // change: "10%",
    // changeColor: "text-green-600",
  },
  {
    label: "Total Hospitals",
    value: "2000",
    // change: "20%",
    // changeColor: "text-red-600",
  },
  // {
  //   label: "Total Claims",
  //   value: "1000",
  //   change: "10%",
  //   changeColor: "text-green-600",
  // },
  // {
  //   label: "Total Staff",
  //   value: "2000",
  //   change: "20%",
  //   changeColor: "text-red-600",
  // },
];

const InsuranceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Subscribers");
  return (
    <div className="px-4">
      <OverViewCard data={overview} />
      <ScheduleTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div>
        {activeTab === "Subscribers" && <SubscribersTable patientData={[]} />}
      </div>
    </div>
  );
};

export default InsuranceDashboard;
