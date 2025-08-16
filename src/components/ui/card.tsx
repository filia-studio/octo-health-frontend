import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="min-w-[343px] h-[198px] border-[0.3px] border-[#D6D6D6] rounded-[4px] bg-white p-[24px] scrollbar-hide">
      {children}
    </div>
  );
};

export default Card;
