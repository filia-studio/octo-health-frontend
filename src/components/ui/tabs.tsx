import React from "react";

interface TabsProps {
  tabs: string[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, setActiveTab, activeTab }) => {
  return (
    <div className="flex items-center gap-[30px]">
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
