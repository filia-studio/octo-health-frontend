import Tabs from "@/components/ui/tabs";
import React from "react";
import SearchProvider from "../search/provider";

interface ScheduleTabsProps {
  tabs: string[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const ScheduleTabs: React.FC<ScheduleTabsProps> = ({
  tabs,
  setActiveTab,
  activeTab,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-8 flex-col lg:flex-row lg:gap-16 justify-between">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} className="flex-wrap" />
        <SearchProvider className="max-lg:max-w-full" />
      </div>
    </div>
  );
};

export default ScheduleTabs;
