import React from "react";

interface ChevronIconProps {
  circleFill?: string;
  fill?: string;
  className?: string;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({
  circleFill = "#F8F8F8",
  fill = "black",
  className = "",
}) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="18" cy="18" r="17.5" fill={circleFill} stroke="black" />
      <path
        d="M21.41 22.58L16.83 18L21.41 13.41L20 12L14 18L20 24L21.41 22.58Z"
        fill={fill}
      />
    </svg>
  );
};

export default ChevronIcon;
