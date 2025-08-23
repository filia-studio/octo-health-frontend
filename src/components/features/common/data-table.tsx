import React from "react";

export type Column<T> = {
  header: string;
  key: keyof T | string; // key in object OR custom
  render?: (row: T) => React.ReactNode; // custom cell renderer
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-[#C80740]">
        <tr className=" text-white">
          {columns.map(({ header }, index) => (
            <th
              key={header}
              className={`text-left py-3 px-4 font-medium
          ${index === 0 ? "rounded-tl-[10px]" : ""}
          ${index === columns.length - 1 ? "rounded-tr-[10px]" : ""}
        `}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="odd:bg-transparent even:bg-white">
            {columns.map(({ key, render }, colIndex) => (
              <td
                key={String(key)}
                className={`py-3 px-4 font-normal text-[15px] ${
                  colIndex === 0 ? "bg-[#A80334] text-white" : "text-black"
                }`}
              >
                {render
                  ? render(row)
                  : (row as Record<string, string>)[key as string]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
