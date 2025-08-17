import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type GridDataProps = {
  title: string;
  value: ReactNode;
  value2?: ReactNode;
};

export const GridDataItem = ({ title, value, value2 }: GridDataProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm font-medium text-gray-400">{title}</p>
      <p className="text-sm font-medium">{value}</p>
      {value2 && <p className="text-sm font-medium">{value2}</p>}
    </div>
  );
};

const GridData = ({
  data,
  className,
}: {
  data: GridDataProps[];
  className?: string;
}) => {
  return (
    <section className={cn("grid grid-cols-1 sm:grid-cols-2 gap-9", className)}>
      {data.map((item, index) => (
        <GridDataItem key={index} {...item} />
      ))}
    </section>
  );
};

export default GridData;
