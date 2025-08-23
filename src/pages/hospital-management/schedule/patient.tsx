import Calendar from "@/components/features/calendar";
import ClaimCard from "@/components/features/cards/claim-card";
import PatientCard from "@/components/features/cards/patient-card";
import ProfileCard from "@/components/features/cards/profile-card";
import React from "react";

const HMPatient: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full px-4">
      <div className="col-span-1 flex flex-col gap-4">
        <ProfileCard />
        <PatientCard />
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex flex-wrap sm:flex-nowrap item-center gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <ClaimCard key={index} />
          ))}
        </div>
        <div className="border-[0.3px] bg-white border-[#C4C4C4] rounded-[12px] p-4">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default HMPatient;
