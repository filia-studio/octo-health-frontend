import { ArrowIcon } from "@/components/icons";
import React from "react";

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
      <button className="flex items-center justify-between border-[0.5px] rounded-[40px] border-black h-5 p-2.5 w-[88px]">
        <span className="text-xs text-black font-medium">Monthly</span>
        <ArrowIcon className="-rotate-180" fill="#000000" />
      </button>
    </div>
  );
};

export default ClaimCard;
