import { ArrowIcon } from "@/components/icons";
import React from "react";

const ClaimCard: React.FC = () => {
  return (
    <div className="w-[50%] h-[172px] flex flex-col gap-[10px] border-[0.3px] bg-white border-[#C4C4C4] rounded-[12px] p-[16px]">
      <div className="flex items-center justify-between">
        <span className="text-black font-semibold text-[15px]">Claims</span>
        <div className="flex items-center">
          <ArrowIcon />
          <span className="text-[15px] text-[#05B687] font-semibold">5%</span>
        </div>
      </div>
      <span className="text-[40px] font-semibold text-black">$400000</span>
      <button className="flex items-center justify-between border-[0.5px] rounded-[40px] border-black h-[21px] p-[10px] w-[88px]">
        <span className="text-[8px] text-black font-medium">Monthly</span>
        <ArrowIcon className="-rotate-180" fill="#000000" />
      </button>
    </div>
  );
};

export default ClaimCard;
