import type { FC, DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

interface IFileUpload
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: ReactNode;
  multiple?: boolean;
}

export const FileUpload: FC<IFileUpload> = ({
  children,
  onChange,
  multiple = true,
}) => {
  return (
    <label htmlFor="file" className="block w-full cursor-pointer">
      <input
        type="file"
        id="file"
        name="file"
        multiple={multiple}
        className="hidden"
        onChange={onChange}
      />
      {children}
    </label>
  );
};