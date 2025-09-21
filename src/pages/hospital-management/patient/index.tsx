import PatientsTable from "@/components/features/tables/patients-table";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import type { IPatient } from "@/types/patient";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getPatientStats } from "./utils";
import OverViewCard, {
  type OverviewCardProps,
} from "@/components/features/cards/overview";

const PatientManagement: React.FC = () => {
  const navigate = useNavigate();

  const { data, refetch } = useFetch<IPatient[]>("patient/", {
    useAuth: false,

    errorMessage: "Failed to load patients",
  });

  const stats = getPatientStats(data ?? []);

  const formatStatsToOverview = (stats: any): OverviewCardProps["data"] => {
    const { activePatients, totalPatients, insuredPatients } = stats;

    return [
      {
        label: "Total Patients",
        value: totalPatients?.toString(),
      },
      {
        label: "Active Patients",
        value: activePatients?.toString(),
      },
      {
        label: "Insured Patients",
        value: insuredPatients?.toString(),
      },
    ];
  };

  const overviewData: OverviewCardProps["data"] = formatStatsToOverview(stats);

  return (
    <div className="px-4">
      <OverViewCard data={overviewData || []} />
      <div className="flex justify-end items-end py-3">
        <Button
          className="bg-black w-max"
          onClick={() => navigate("create-patient")}
        >
          Add Patient
        </Button>
      </div>

      <PatientsTable patientData={data ?? []} refetch={refetch} />
    </div>
  );
};

export default PatientManagement;
