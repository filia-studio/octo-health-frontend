import GridData, {
  type GridDataProps,
} from "@/components/features/common/grid-data";
import ProfileInfo from "@/components/features/profile/profile-info";
import MinusIcon from "@/components/icons/MinusIcon";
import React from "react";

const Nurse: React.FC = () => {
  const patientCardData: GridDataProps[] = [
    {
      title: "Email",
      value: "hi@octohealth.pro",
    },
    {
      title: "Member Since",
      value: "02 July 2025",
    },
    {
      title: "Age",
      value: "30 Years Old",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-center p-[24px] justify-center w-full border-[#C4C4C4] border-[0.5px] rounded-[21px] bg-white min-h-[132px]">
          <ProfileInfo
            name="Saidat Mukhtar"
            showProgress={false}
            subName="Nurse"
            className="flex items-center"
          />
        </div>
        <div className="border border-[#DBD9D9] rounded-[12px] bg-white p-[24px] h-full">
          <div className="my-[24px]">
            <GridData data={patientCardData} className="sm:grid-cols-1" />
          </div>
          <MinusIcon />
        </div>
      </div>
    </div>
  );
};

export default Nurse;
