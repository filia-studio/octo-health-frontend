import React from "react";

interface IconButtonProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  width = "29px",
  height = "29px",
  onClick,
}) => {
  return (
    <div
      style={{ width, height }}
      onClick={(e) => onClick && onClick(e)}
      className="rounded-full bg-[#000000] flex items-center justify-center cursor-pointer"
    >
      {children}
    </div>
  );
};

export default IconButton;
