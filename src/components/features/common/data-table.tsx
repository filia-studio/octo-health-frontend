import { cn } from "@/lib/utils";
import React from "react";

export type Column<T> = {
  header: string;
  headerClassName?: string;
  cellClassName?: string;
  className?: string;
  key: keyof T | string; // key in object OR custom
  render?: (row: T) => React.ReactNode; // custom cell renderer
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  onRowClick?: (row: T) => void;
};

const DataTable = <T extends object>({
  columns,
  data,
  loading,
  onRowClick,
}: DataTableProps<T>) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-[#C80740]">
        <tr className=" text-white">
          {columns.map(({ header, headerClassName, className }, index) => (
            <th
              key={header}
              className={cn(
                `text-left py-3 px-4 font-medium
          ${index === 0 ? "rounded-tl-[10px]" : ""}
          ${index === columns.length - 1 ? "rounded-tr-[10px]" : ""}`,
                headerClassName,
                className
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td
              colSpan={columns.length}
              className="h-52 text-center text-2xl bg-white"
            >
              Loading...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="h-52 text-center text-2xl bg-white"
            >
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="odd:bg-transparent even:bg-white">
              {columns.map(
                ({ key, render, cellClassName, className }, colIndex) => (
                  <td
                    key={String(key)}
                    onClick={() => colIndex === 0 && onRowClick?.(row)}
                    className={cn(
                      `py-3 px-4 font-normal text-[15px] ${
                        colIndex === 0
                          ? "bg-[#A80334] text-white cursor-pointer"
                          : "text-black bg-white"
                      }`,
                      {
                        "hover:bg-[#A80334]/90":
                          colIndex === 0 && Boolean(onRowClick),
                      },
                      cellClassName,
                      className
                    )}
                  >
                    {render
                      ? render(row)
                      : (row as Record<string, string>)[key as string]}
                  </td>
                )
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default DataTable;
