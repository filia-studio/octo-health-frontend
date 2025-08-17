import Calendar from "@/components/features/calendar";
import ClaimCard from "@/components/features/cards/claim-card";
import PatientCard from "@/components/features/cards/patient-card";
import ProfileCard from "@/components/features/cards/profile-card";
import React from "react";

const HMPatient: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-[16px] pr-[64px] h-full">
      <div className="col-span-1 flex flex-col gap-[16px]">
        <ProfileCard />
        <PatientCard />
      </div>
      <div className="col-span-2 flex flex-col gap-[16px]">
        <div className="flex item-center gap-[16px]">
          {Array.from({ length: 2 }).map((_, index) => (
            <ClaimCard key={index} />
          ))}
        </div>
        <div className="border-[0.3px] bg-white border-[#C4C4C4] rounded-[12px] p-[16px]">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default HMPatient;
