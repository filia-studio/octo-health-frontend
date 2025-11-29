import PatientsTable from "@/components/features/tables/patients-table";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import type { IPatient } from "@/types/patient";
import React from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { healthcareUrl } from "@/routes/paths";

const PatientManagement: React.FC = () => {
  const { data, refetch, isLoading } = useFetch<{
    message: string;
    success: boolean;
    data: IPatient[];
  }>("patient/", {
    useAuth: true,
    hideToast: "success",
    errorMessage: "Failed to load patients",
  });

  return (
    <div className="px-4">
      <div className="flex justify-end items-end py-3">
        <Button asChild>
          <Link to={`${healthcareUrl}/patient-management/create`}>
            <FaPlusCircle />
            Create Patient
          </Link>
        </Button>
      </div>

      <PatientsTable
        isLoading={isLoading}
        patientData={data?.data ?? []}
        refetch={refetch}
      />
    </div>
  );
};

export default PatientManagement;
