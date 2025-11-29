import React, { useState } from "react";
import { overview, recentItems, tabs } from "@/data";
import ScheduleTabs from "@/components/features/tabs/schedule-tabs";
import OverViewCard from "@/components/features/cards/overview";
import PatientsTable from "@/components/features/tables/patients-table";
import RecentSection from "@/components/features/pills/recent";
import { useFetch } from "@/hooks/use-fetch";
import type { IPatient } from "@/types/patient";
import AppointmentsTable from "@/components/features/tables/appointments-table";
import type { Appointment } from "@/types/appointment";
import { useStore } from "@/store";

const HMSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Patients");
  const healthcare = useStore((s) => s.healthcareAuth.details);
  const [search, setSearch] = useState("");

  const { data: patients, isLoading: loadingPatients } = useFetch<{
    data: IPatient[];
  }>("patient/", {
    enabled: activeTab === "Patients",
    hideToast: "success",
    errorMessage: "Failed to load patients",
    params: {
      ...(search ? { search } : {}),
    },
  });

  const {
    data: healthcareAppointmentsData,
    isLoading: loadingAppointments,
    refetch: refetchAppointments,
  } = useFetch<Appointment[]>("/appointment/", {
    hideToast: "success",
    enabled: activeTab === "Appointments",
    params: {
      healthcare_id: healthcare?.id,
      search,
    },
  });

  return (
    <div className="px-4">
      <RecentSection items={recentItems} />
      <OverViewCard data={overview} />
      <ScheduleTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearch={setSearch}
      />
      <div>
        {activeTab === "Patients" && (
          <PatientsTable
            isLoading={loadingPatients}
            patientData={patients?.data ?? []}
          />
        )}
        {activeTab === "Appointments" && (
          <AppointmentsTable
            isLoading={loadingAppointments}
            data={healthcareAppointmentsData ?? []}
            refresh={refetchAppointments}
          />
        )}
      </div>
    </div>
  );
};

export default HMSchedule;
