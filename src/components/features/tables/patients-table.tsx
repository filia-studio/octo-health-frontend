import DeleteIcon from "@/components/icons/DeleteIcon";
import DataTable, { type Column } from "@/components/features/common/data-table";
import React from "react";
import { useNavigate } from "react-router-dom";

const patientData = [
  {
    id: 1,
    name: "Jackson Owolabi",
    code: "0000000",
    plan: "Rivermind Lux",
    premium: "N450000",
    deductible: "N450000",
    usage: "2M/4M",
  },
  {
    id: 2,
    name: "Daisy Isaac",
    code: "0000000",
    plan: "Rivermind Lite",
    premium: "N90000",
    deductible: "N90000",
    usage: "1M/10M",
  },
  {
    id: 3,
    name: "Sade Ighodalo",
    code: "0000000",
    plan: "Rivermind Premium",
    premium: "N70000",
    deductible: "N70000",
    usage: "100K/10M",
  },
  {
    id: 4,
    name: "Jus McPherson",
    code: "0000000",
    plan: "Rivermind Basic",
    premium: "N80000",
    deductible: "N80000",
    usage: "9M/10M",
  },
  {
    id: 5,
    name: "Jackson Owolabi",
    code: "0000000",
    plan: "Rivermind Lux",
    premium: "N450000",
    deductible: "N450000",
    usage: "2M/4M",
  },
  {
    id: 6,
    name: "Daisy Isaac",
    code: "0000000",
    plan: "Rivermind Lite",
    premium: "N90000",
    deductible: "N90000",
    usage: "1M/10M",
  },
  {
    id: 7,
    name: "Sade Ighodalo",
    code: "0000000",
    plan: "Rivermind Premium",
    premium: "N70000",
    deductible: "N70000",
    usage: "100K/10M",
  },
];

const PatientsTable: React.FC = () => {
  const navigate = useNavigate();

  const columns: Column<typeof patientData[0]>[] = [
    {
      header: "Name",
      key: "name",
      render: (row) => (
        <div onClick={() => navigate(`${row?.id}`)} className="text-white">
          {row?.name}
        </div>
      ),
    },
    { header: "Code", key: "code" },
    { header: "Plan", key: "plan" },
    { header: "Premium", key: "premium" },
    { header: "Deductible", key: "deductible" },
    {
      header: "Usage",
      key: "usage",
      render: (row) => {
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
  return (
    <div>
      <DataTable columns={columns} data={patientData || []} />
    </div>
  );
};

export default PatientsTable;
