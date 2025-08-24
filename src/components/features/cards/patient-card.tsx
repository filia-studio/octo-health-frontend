import Tabs from "@/components/ui/tabs";
import React, { useState } from "react";
import GridData, { type GridDataProps } from "../common/grid-data";

const patientCardData: GridDataProps[] = [
  {
    title: "Email",
    value: "hi@octohealth.pro",
  },
  {
    title: "Gender",
    value: "Female",
  },
  {
    title: "Member Since",
    value: "02 July 2025",
  },
  { title: "Phone", value: "+1 234 567 8900" },
  {
    title: "Age",
    value: "30 Years Old",
  },
  {
    title: "Recent Consultancy",
    value: "123 Main St, Springfield, USA",
  },
];

const insuranceData: GridDataProps[] = [
  {
    title: "Provider",
    value: "AXA Mansard",
  },
  {
    title: "Code",
    value: "90430439",
  },
  {
    title: "Support",
    value: "help@axa.com",
  },
  {
    title: "Plan Status",
    value: (
      <span>
        400K / <span className="text-primary">N2M</span>
      </span>
    ),
  },
  {
    title: "Plan Tier",
    value: "Deluxe Pro II",
  },
];

const PatientCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  return (
    <div className="border border-[#DBD9D9] rounded-[12px] bg-white p-[24px] h-full">
      <Tabs
        tabs={["Overview", "Insurance"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="my-[24px]">
        {activeTab === "Overview" && <GridData data={patientCardData} />}
        {activeTab === "Insurance" && <GridData data={insuranceData} />}
      </div>
    </div>
  );
};

export default PatientCard;
