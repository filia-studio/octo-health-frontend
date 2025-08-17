import React from "react";

interface InputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  onChange,
  value,
  placeholder = "Search...",
  ...props
}) => {
  return (
    <div>
      <input
        type="text"
        className={className}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
