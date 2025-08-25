import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type GridDataProps = {
  title: string;
  value: ReactNode;
  value2?: ReactNode;
};

type GridDataItemProps = GridDataProps & {
  gridItemClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
};

export const GridDataItem = ({
  title,
  value,
  value2,
  gridItemClassName,
  titleClassName,
  valueClassName,
}: GridDataItemProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5", gridItemClassName)}>
      <p className={cn("text-sm font-medium text-gray-400", titleClassName)}>
        {title}
      </p>
      <p className={cn("text-sm font-medium", valueClassName)}>{value}</p>
      {value2 && <p className="text-sm font-medium">{value2}</p>}
    </div>
  );
};

const GridData = ({
  data,
  className,
  gridItemClassName,
  titleClassName,
  valueClassName,
}: {
  data: GridDataProps[];
  className?: string;
  gridItemClassName?: string;
  titleClassName?: string;
  valueClassName?: string;
}) => {
  return (
    <section className={cn("grid grid-cols-1 sm:grid-cols-2 gap-9", className)}>
      {data.map((item, index) => (
        <GridDataItem
          gridItemClassName={gridItemClassName}
          titleClassName={titleClassName}
          valueClassName={valueClassName}
          key={index}
          {...item}
        />
      ))}
    </section>
  );
};

export default GridData;
