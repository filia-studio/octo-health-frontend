import Pill from "@/components/ui/pill";
import React from "react";

interface RecentSectionProps {
  items: string[];
}

const RecentSection: React.FC<RecentSectionProps> = ({ items }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-black mb-4">Recent</h3>
      <div className="overflow-x-auto w-full">
        <div className="w-fit">
          <div className="flex gap-2 pb-2">
            {items.map((item, index) => (
              <Pill key={index} label={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSection;
