import Calendar from "@/components/features/calendar";
import ClaimCard from "@/components/features/cards/claim-card";
import PatientCard from "@/components/features/cards/patient-card";
import ProfileCard from "@/components/features/cards/profile-card";
import { useStore } from "@/store";
import type { IHealthcare } from "@/types/healthcare";
import type { Patient } from "@/types/otp";
import type { IPatient } from "@/types/patient";
import React from "react";
import { useLocation } from "react-router-dom";

const HMPatient: React.FC = () => {
  const { state } = useLocation();
  const healthcare = useStore((store) => store.healthcareAuth.details);
  const patientData: Patient = state?.patient || {};
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full px-4">
      <div className="col-span-1 flex flex-col gap-4">
        <ProfileCard
          patientName={`${patientData?.user?.last_name ?? ""} ${
            patientData?.user?.first_name ?? ""
          }`}
          insuranceProvider={
            patientData?.insurance_details?.length > 1
              ? `${patientData.insurance_details[0]?.insurance_type} +${
                  patientData.insurance_details.length - 1
                }`
              : patientData?.insurance_details?.[0]?.insurance_type ?? ""
          }
          insurancePlan={
            patientData?.insurance_details?.length > 1
              ? `${patientData.insurance_details[0]?.insurance_plan} +${
                  patientData.insurance_details.length - 1
                }`
              : patientData?.insurance_details?.[0]?.insurance_plan ?? ""
          }
        />
        <PatientCard patientData={patientData as IPatient} />
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex flex-wrap sm:flex-nowrap item-center gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <ClaimCard key={index} />
          ))}
        </div>
        <div className="border-[0.3px] bg-white border-[#C4C4C4] rounded-[12px] p-4">
          <Calendar
            isPatient={false}
            healthcare={healthcare as IHealthcare}
            patient={patientData}
          />
        </div>
      </div>
    </div>
  );
};

export default HMPatient;
