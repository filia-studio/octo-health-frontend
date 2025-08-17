import DeleteIcon from "@/components/icons/DeleteIcon";
import DataTable from "@/components/ui/DataTable";
import React from "react";

const columns = [
  { header: "Name", key: "name" },
  { header: "Code", key: "code" },
  { header: "Plan", key: "plan" },
  { header: "Premium", key: "premium" },
  { header: "Deductible", key: "deductible" },
  {
    header: "Usage",
    key: "usage",
    render: (row: any) => {
      const splitUsage = row.usage.split("/");
      return (
        <div className="flex items-center">
          <span className="text-[#747474]">{splitUsage[0]}</span>
          <span className="text-[#747474]">/</span>
          <span>{splitUsage[1]}</span>
        </div>
      );
    },
  },
  {
    header: "Action",
    key: "action",
    render: () => <DeleteIcon />,
  },
];

const patientData = [
  {
    name: "Jackson Owolabi",
    code: "0000000",
    plan: "Rivermind Lux",
    premium: "N450000",
    deductible: "N450000",
    usage: "2M/4M",
  },
  {
    name: "Daisy Isaac",
    code: "0000000",
    plan: "Rivermind Lite",
    premium: "N90000",
    deductible: "N90000",
    usage: "1M/10M",
  },
  {
    name: "Sade Ighodalo",
    code: "0000000",
    plan: "Rivermind Premium",
    premium: "N70000",
    deductible: "N70000",
    usage: "100K/10M",
  },
  {
    name: "Jus McPherson",
    code: "0000000",
    plan: "Rivermind Basic",
    premium: "N80000",
    deductible: "N80000",
    usage: "9M/10M",
  },
  {
    name: "Jackson Owolabi",
    code: "0000000",
    plan: "Rivermind Lux",
    premium: "N450000",
    deductible: "N450000",
    usage: "2M/4M",
  },
  {
    name: "Daisy Isaac",
    code: "0000000",
    plan: "Rivermind Lite",
    premium: "N90000",
    deductible: "N90000",
    usage: "1M/10M",
  },
  {
    name: "Sade Ighodalo",
    code: "0000000",
    plan: "Rivermind Premium",
    premium: "N70000",
    deductible: "N70000",
    usage: "100K/10M",
  },
];

const PatientsTable: React.FC = () => {
  return (
    <div>
      <DataTable columns={columns} data={patientData || []} />
    </div>
  );
};

export default PatientsTable;
