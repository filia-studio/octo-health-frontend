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
        <h3 className="text-lg font-bold text-black">Overview</h3>
        <div className="flex gap-2 pr-12">
          <ChevronIcon />
          <ChevronIcon
            circleFill="#000000"
            fill="#ffffff"
            className="rotate-180"
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex items-center gap-4 pb-2">
          {data?.map((stat, idx) => (
            <div
              className="min-w-[21.4rem] w-full h-[12.375rem] border-[0.3px] border-[#D6D6D6] rounded-lg bg-white p-6"
              key={idx}
            >
              <span className="font-semibold text-black">{stat.label}</span>
              <div>
                <div className="text-6xl font-semibold text-black mb-2">
                  {stat.value}
                </div>
                <div className="flex items-center">
                  <ArrowIcon />
                  <span className={`font-semibold ${stat.changeColor}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverViewCard;
