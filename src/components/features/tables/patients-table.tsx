import DeleteIcon from "@/components/icons/DeleteIcon";
import DataTable, {
  type Column,
} from "@/components/features/common/data-table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IPatient } from "@/types/patient";
import { calculateAge } from "@/pages/healthcare/patient/utils";
import { useSend } from "@/hooks/use-send";

const PatientsTable: React.FC<{
  patientData: IPatient[] | null;
  refetch?: () => void;
}> = ({ patientData, refetch }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("");

  const { mutate: deletePatient } = useSend<never, { message: string }>(
    `patient/${selectedId}/`,
    {
      method: "delete",
      useAuth: false,
      onSuccess: () => {
        refetch?.();
      },
      errorMessage: "Failed to delete patient",
      successMessage: "Patient record deleted successfully",
      hideToast: "all",
    }
  );

  const handleDelete = () => {
    deletePatient(undefined as never);
  };

  const columns: Column<IPatient>[] = [
    {
      header: "Name",
      key: "name",
      render: (row) => (
        <div
          onClick={() => navigate(`${row?.id}`, { state: { patient: row } })}
          className="text-white"
        >
          {row?.user?.first_name} {row?.user?.last_name}
        </div>
      ),
    },
    {
      header: "Age",
      key: "age",
      render: (row) => <div>{calculateAge(row?.user?.date_of_birth)}</div>,
    },
    {
      header: "Email",
      key: "email",
      render: (row) => <div>{row?.user?.email}</div>,
    },
    {
      header: "Address",
      key: "address",
      render: (row) => <div>{row?.user?.address}</div>,
    },
    {
      header: "Phone Number",
      key: "contact_number",
      render: (row) => <div>{row?.user?.contact_number}</div>,
    },
    {
      header: "Action",
      key: "action",
      render: (row) => (
        <div
          onClick={() => {
            setSelectedId(row?.id);
            handleDelete();
          }}
          className="cursor-pointer"
        >
          <DeleteIcon />
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={patientData || []} />
    </div>
  );
};

export default PatientsTable;
