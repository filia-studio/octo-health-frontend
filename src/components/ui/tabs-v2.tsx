import { cn } from "@/lib/utils";
import React from "react";

interface TabsProps {
  tabs: string[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  setActiveTab,
  activeTab,
  className,
}) => {
  return (
    <div className={cn("flex items-center bg-white border border-primary border-r-0 rounded w-fit overflow-hidden", className)}>
      {tabs.map((tab: string) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-base transition-colors cursor-pointer p-2 font-medium min-w-28 border-r border-primary ${
            activeTab === tab
              ? "bg-primary text-white"
              : "text-black"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
