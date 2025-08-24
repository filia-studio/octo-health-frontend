import { ArrowIcon } from "@/components/icons";
import React from "react";
import PillDropdown from "../pills/dropdown";

const ClaimCard: React.FC = () => {
  return (
    <div className="w-full sm:w-1/2 h-[10.75rem] flex flex-col gap-2.5 border-[0.3px] bg-white border-[#C4C4C4] rounded-[12px] p-4">
      <div className="flex items-center justify-between">
        <span className="text-black font-semibold">Claims</span>
        <div className="flex items-center">
          <ArrowIcon />
          <span className="text-[#05B687] font-semibold">5%</span>
        </div>
      </div>
      <span className="text-4xl font-semibold text-black">$400000</span>
      <PillDropdown
        value="monthly"
        className="border-black min-w-20 text-black px-2.5"
        options={[
          { label: "Monthly", value: "monthly" },
          { label: "Yearly", value: "yearly" },
        ]}
        onValueChange={(value) => console.log(value)}
      />
    </div>
  );
};

export default ClaimCard;
