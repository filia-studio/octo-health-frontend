import React from "react";

interface BadgeProps {
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
  return (
    <div className="h-[36px] py-[8px] px-[24px] text-center text-[15px] font-normal text-black flex items-center justify-center border border-[#D6D6D6] rounded-[20px] w-max bg-white">
      {label}
    </div>
  );
};

export default Badge;
