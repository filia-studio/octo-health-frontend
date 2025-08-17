import FilterIcon from "@/components/icons/FilterIcon";
import IconButton from "@/components/ui/IconButton";
import Tabs from "@/components/ui/tabs";
import React from "react";

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
    <div className="mb-6 pr-[64px]">
      <div className="flex items-center gap-[75px] justify-between">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search"
            className="h-[45px] border border-black rounded-[200px] bg-white w-[428px] px-[16px]"
          />
          <IconButton width="46.78px" height="46.78px">
            <FilterIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTabs;
