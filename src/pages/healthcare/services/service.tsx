import AppointmentsTable from "@/components/features/tables/appointments-table";
import HealthcareClaimsTable from "@/components/features/tables/healthcare-claims-table";
import Tabs from "@/components/ui/tabs-v2";
import { useFetch } from "@/hooks/use-fetch";
import { useSearchQuery } from "@/hooks/use-search-query";
import { useStore } from "@/store";
import type { Appointment } from "@/types/appointment";
import type { HealthcareClaimResponse } from "@/types/healthcare";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ServicePage = () => {
  const { id } = useParams();
  const { params } = useSearchQuery();
  const { details: healthcareDetails } = useStore((s) => s.healthcareAuth);
  const [activeTab, setActiveTab] = useState("Appointments");
  const [status, setStatus] = useState("Pending");

  const tabs =
    activeTab === "Appointments"
      ? ["Pending", "Approved", "Declined", "Cancelled", "Completed"]
      : ["Pending", "Submitted", "Approved", "Rejected"];

  const {
    data: healthcareAppointmentsData,
    isLoading: loadingAppointments,
    refetch: refetchAppointments,
  } = useFetch<Appointment[]>("/appointment/", {
    hideToast: "success",
    enabled: activeTab === "Appointments",
    params: {
      status: status.toLowerCase(),
      healthcare_id: healthcareDetails?.id,
      healthcare_service: id,
    },
  });

  const { data: healthcareClaimsData } = useFetch<HealthcareClaimResponse>(
    `healthcare-claim/my_claims`,
    {
      hideToast: "success",
      errorMessage: "Failed to load claims record",
      enabled: activeTab === "Claims",
      params: {
        status: status.toLowerCase(),
      },
    }
  );

  return (
    <section className="px-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-medium">{params.get("n")}</h4>
        <Tabs
          tabs={["Appointments", "Claims"]}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setStatus("Pending");
          }}
        />
      </div>
      <div className="my-6 pt-6 border-t">
        <Tabs tabs={tabs} activeTab={status} setActiveTab={setStatus} />
      </div>

      {activeTab === "Appointments" && (
        <AppointmentsTable
          isLoading={loadingAppointments}
          data={healthcareAppointmentsData ?? []}
          refresh={refetchAppointments}
        />
      )}

      {activeTab === "Claims" && (
        <HealthcareClaimsTable data={healthcareClaimsData?.data ?? []} />
      )}
    </section>
  );
};

export default ServicePage;
