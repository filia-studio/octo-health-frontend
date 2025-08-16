import React from "react";

interface ArrowIconProps {
  fill?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ fill = "#05B687" }) => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.19444 11H4.80556V2.66667L0.986111 6.48611L0 5.5L5.5 0L11 5.5L10.0139 6.48611L6.19444 2.66667V11Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowIcon;
