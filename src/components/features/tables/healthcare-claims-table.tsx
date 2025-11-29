import type { HealthcareClaim } from "@/types/healthcare";
import type { Column } from "../common/data-table";
import { useFetch } from "@/hooks/use-fetch";
import type { InsuranceProviderListResponse } from "@/types/insurance";
import { cn, formatAPIDate, getBadgeVarient } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { healthcareUrl } from "@/routes/paths";
import { Button } from "@/components/ui/button";
import DataTable from "../common/data-table";

const HealthcareClaimsTable = ({ data }: { data: HealthcareClaim[] }) => {
  const { data: insuranceProviders } = useFetch<
    InsuranceProviderListResponse[]
  >("insurance_provider/", {
    useAuth: false,
    hideToast: "success",
    errorMessage: "Failed to load insurance providers",
  });

  const handleAcknowledge = (claimId: string) => {
    console.log(`Acknowledged reimbursement for claim: ${claimId}`);
  };

  const columns: Column<HealthcareClaim>[] = [
    {
      header: "Patient",
      key: "claim_patient",
      render(row) {
        return (
          <span>
            {row?.patients_details
              ? `${row?.patients_details?.first_name} ${row?.patients_details?.last_name}`
              : "—"}
          </span>
        );
      },
    },
    {
      header: "Insurance Provider",
      key: "insurance_provider",
      render(row) {
        const provider = insuranceProviders?.find(
          (p) => p.id === row.insurance_provider
        );
        return <span>{provider?.insurance?.name || "—"}</span>;
      },
    },
    {
      header: "Diagnosis (ICD Code)",
      key: "diagnosis_icd_code",
    },
    {
      header: "Consultation Date",
      key: "consultation_date",
      render(row) {
        return formatAPIDate(row.consultation_date);
      },
    },
    {
      header: "Status",
      key: "status",
      render(row) {
        return (
          <Badge className={cn(getBadgeVarient(row.status), "capitalize")}>
            {row.status}
          </Badge>
        );
      },
    },
    {
      header: "Submitted On",
      key: "created_at",
      render(row) {
        return formatAPIDate(row.created_at);
      },
    },
    {
      header: "Actions",
      key: "actions",
      render(row) {
        return (
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`${healthcareUrl}/claims/${row.id}`}
              state={{ claim: row }}
              className="text-sm text-blue-600 hover:underline"
            >
              View Details
            </Link>
            {row.status === "approved" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAcknowledge(row.id)}
              >
                Acknowledge
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data || []} />;
};

export default HealthcareClaimsTable;
