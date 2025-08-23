import React from "react";

interface PillProps {
  label: string;
}

const Pill: React.FC<PillProps> = ({ label }) => {
  return (
    <div className="h-9 py-2 px-6 text-center font-normal text-black flex items-center justify-center border border-[#D6D6D6] rounded-[1.25rem] w-max bg-white">
      {label}
    </div>
  );
};

export default Pill;
