import React from "react";
import { ArrowIcon, ChevronIcon } from "@/components/icons";

interface OverviewCardProps {
  data: {
    label: string;
    value: string;
    change: string;
    changeColor: string;
  }[];
}

const OverViewCard: React.FC<OverviewCardProps> = ({ data }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[17px] font-bold text-black mb-4">Overview</h3>
        <div className="flex gap-2 pr-[64px]">
          <ChevronIcon />
          <ChevronIcon
            circleFill="#000000"
            fill="#ffffff"
            className="rotate-180"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 pb-2">
        {data?.map((stat, idx) => (
          <div
            className="min-w-[343px] h-[198px] border-[0.3px] border-[#D6D6D6] rounded-[4px] bg-white p-[24px]"
            key={idx}
          >
            <span className="text-[15px] font-semibold text-[#000000]">
              {stat.label}
            </span>
            <div>
              <div className="text-[60px] font-semibold text-[#000000] mb-2">
                {stat.value}
              </div>
              <div className="flex items-center">
                <ArrowIcon />
                <span
                  className={`text-[15px] font-semibold ${stat.changeColor}`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverViewCard;
