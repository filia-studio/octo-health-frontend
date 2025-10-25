import Tabs from "@/components/ui/tabs";
import React, { useState } from "react";
import GridData, { type GridDataProps } from "../common/grid-data";
import type { IPatient } from "@/types/patient";
import { calculateAge } from "@/pages/healthcare/patient/utils";

interface PatientCardProps {
  patientData: IPatient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patientData }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const patientCardData: GridDataProps[] = [
    {
      title: "Email",
      value: patientData?.user?.email ?? "N/A",
    },
    {
      title: "Gender",
      value: patientData?.user?.gender ?? "N/A",
    },
    {
      title: "Member Since",
      value: new Date(patientData?.user?.date_joined).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      ),
    },
    {
      title: "Phone",
      value: patientData?.user?.contact_number ?? "N/A",
    },
    {
      title: "Age",
      value: `${calculateAge(patientData?.user?.date_of_birth)} Years Old`,
    },
    {
      title: "Address",
      value: patientData?.user?.address ?? "N/A",
    },
  ];

  const insurance = patientData?.insurance_details?.[0];

  const insuranceData: GridDataProps[] = insurance
    ? [
        {
          title: "Provider",
          value: insurance?.name ?? "N/A",
        },
        {
          title: "Type",
          value: insurance?.insurance_type ?? "N/A",
        },
        {
          title: "Plan Tier",
          value: insurance?.insurance_plan ?? "N/A",
        },
        {
          title: "Patient ID",
          value: insurance?.patient ?? "N/A",
        },
      ]
    : [{ title: "No Insurance", value: "N/A" }];

  return (
    <div className="border border-[#DBD9D9] rounded-[12px] bg-white p-[24px] h-full">
      <Tabs
        tabs={["Overview", "Insurance"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="my-[24px]">
        {activeTab === "Overview" && (
          <GridData data={patientCardData} className="w-full" />
        )}
        {activeTab === "Insurance" && <GridData data={insuranceData} />}
      </div>
    </div>
  );
};

export default PatientCard;
