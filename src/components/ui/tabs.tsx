import { cn } from "@/lib/utils";
import React from "react";

interface TabsProps {
  tabs: string[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, setActiveTab, activeTab, className }) => {
  return (
    <div className={cn("flex items-center gap-7", className)}>
      {tabs.map((tab: string) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-[16px] transition-colors cursor-pointer ${
            activeTab === tab
              ? "text-black font-bold"
              : "text-[#676767] font-normal"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
