import React, { useState } from "react";
import { overview, recentItems, tabs } from "@/data";
import ScheduleTabs from "@/components/features/tabs/schedule-tabs";
import OverViewCard from "@/components/features/cards/overview";
import PatientsTable from "@/components/features/tables/patients-table";
import RecentSection from "@/components/features/pills/recent";
import { useFetch } from "@/hooks/use-fetch";
import type { IPatient } from "@/types/patient";
import AppointmentsTable from "@/components/features/tables/appointments-table";
import type { HealthcareAppointment } from "@/types/appointment";

const HMSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Patients");

  const { data: patients, isLoading: loadingPatients } = useFetch<IPatient[]>(
    "patient/",
    {
      useAuth: false,
      enabled: activeTab === "Patients",
      hideToast: "success",
      errorMessage: "Failed to load patients",
    }
  );

  const {
    data: healthcareAppointmentsData,
    isLoading: loadingAppointments,
    refetch: refetchAppointments,
  } = useFetch<{
    data: HealthcareAppointment[];
  }>("/appointment/all_appointments/", {
    hideToast: "success",
    enabled: activeTab === "Appointments",
  });

  return (
    <div className="px-4">
      <RecentSection items={recentItems} />
      <OverViewCard data={overview} />
      <ScheduleTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div>
        {activeTab === "Patients" && (
          <PatientsTable
            isLoading={loadingPatients}
            patientData={patients ?? []}
          />
        )}
        {activeTab === "Appointments" && (
          <AppointmentsTable
            isLoading={loadingAppointments}
            data={healthcareAppointmentsData?.data ?? []}
            refresh={refetchAppointments}
          />
        )}
      </div>
    </div>
  );
};

export default HMSchedule;
