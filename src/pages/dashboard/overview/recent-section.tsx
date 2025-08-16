import Badge from "@/components/ui/badge";
import React from "react";

interface RecentSectionProps {
  items: string[];
}

const RecentSection: React.FC<RecentSectionProps> = ({ items }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {items.map((item, index) => (
          <Badge key={index} label={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentSection;
