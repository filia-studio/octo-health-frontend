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
    <div className="mb-6 pr-16">
      <div className="flex items-center gap-16 justify-between">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchProvider />
      </div>
    </div>
  );
};

export default ScheduleTabs;
