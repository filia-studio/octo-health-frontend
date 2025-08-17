import React from "react";
import { LogoIcon } from "@/components/icons";
import Dot from "@/components/ui/Dot";
import { sidebarRoutes } from "@/routes/paths";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname?.includes(path);
  };

  const handleNavigate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    path: string
  ) => {
    e.preventDefault();
    navigate(path);
  };
  return (
    <div className="min-w-64 bg-white border-r border-gray-200">
      <div className="h-[173px] flex justify-center items-center border-b border-gray-200">
        <LogoIcon />
      </div>
      <div className="pl-[11px]">
        <div className="text-[15px] pb-[32px] pt-[22px] text-[#C80740] pl-[9px] font-medium">
          MENU
        </div>
        <nav className="flex flex-col gap-[48px]">
          {sidebarRoutes.map((item, index) => (
            <div className="flex items-center gap-[6px]">
              {isActive(item.path) ? <Dot /> : <div></div>}

              <button
                onClick={(e) => handleNavigate(e, item.path)}
                key={index}
                className="w-full text-[15px] cursor-pointer flex items-center font-medium text-black rounded-lg transition-colors"
              >
                {item.label}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
