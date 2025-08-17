import React from "react";
import { ArrowIcon, ChevronIcon } from "@/components/icons";

const OverViewSection: React.FC = () => {
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
        {[
          {
            label: "Total Patients",
            value: "1300",
            change: "5%",
            changeColor: "text-green-600",
          },
          {
            label: "Total Claims",
            value: "1000",
            change: "10%",
            changeColor: "text-green-600",
          },
          {
            label: "Total Staff",
            value: "2000",
            change: "20%",
            changeColor: "text-red-600",
          },
          // {
          //   label: "Total Claims",
          //   value: "1000",
          //   change: "10%",
          //   changeColor: "text-green-600",
          // },
          // {
          //   label: "Total Staff",
          //   value: "2000",
          //   change: "20%",
          //   changeColor: "text-red-600",
          // },
        ].map((stat, idx) => (
          <div
            className="min-w-[343px] h-[198px] border-[0.3px] border-[#D6D6D6] rounded-[4px] bg-white p-[24px]"
            key={idx}
          >
            {/* <CardHeader className="pb-2"> */}
            <span className="text-[15px] font-semibold text-[#000000]">
              {stat.label}
            </span>
            {/* </CardHeader> */}
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

export default OverViewSection;
