import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable, {
  type Column,
} from "@/components/features/common/data-table";
import { useFetch } from "@/hooks/use-fetch";
import { cn, formatAPIDate, getBadgeVarient } from "@/lib/utils";
import { healthcareUrl } from "@/routes/paths";
import type {
  HealthcareClaim,
  HealthcareClaimResponse,
} from "@/types/healthcare";
import type { IPatient } from "@/types/patient";
import type { InsuranceProviderListResponse } from "@/types/insurance";

const HealthcareClaims = () => {
  const [filters, setFilters] = useState({
    consultation_date: "",
    end_date: "",
    patient_id: "",
    start_date: "",
    status: "",
  });

  const query = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return params.toString();
  }, [filters]);

  const { data: patientResponse } = useFetch<{
    message: string;
    success: boolean;
    data: IPatient[];
  }>("patient/", {
    useAuth: true,
    hideToast: "success",
    errorMessage: "Failed to load patients",
  });

  const { data: insuranceProviders } = useFetch<
    InsuranceProviderListResponse[]
  >("insurance_provider/", {
    useAuth: false,
    hideToast: "success",
    errorMessage: "Failed to load insurance providers",
  });

  const { data, refetch } = useFetch<HealthcareClaimResponse>(
    `healthcare-claim/my_claims?${query}`,
    {
      useAuth: true,
      hideToast: "success",
      errorMessage: "Failed to load claims record",
    }
  );

  const patientOptions =
    patientResponse?.data?.map((p) => ({
      label: `${p.user.first_name} ${p.user.last_name}`,
      value: p.id,
    })) || [];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      consultation_date: "",
      end_date: "",
      patient_id: "",
      start_date: "",
      status: "",
    });
    refetch();
  };

  const handleAcknowledge = (claimId: string) => {
    console.log(`Acknowledged reimbursement for claim: ${claimId}`);
  };

  const columns: Column<HealthcareClaim>[] = [
    {
      header: "Patient",
      key: "claim_patient",
      render(row) {
        const patientData = patientResponse?.data?.find(
          (patient) => patient?.id === row?.claim_patient
        );

        return (
          <span>
            {patientData
              ? `${patientData?.user?.first_name} ${patientData?.user?.last_name}`
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

  return (
    <section className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          <Select
            value={
              patientOptions?.find(
                (patient) => patient?.value === filters?.patient_id
              )?.value
            }
            onValueChange={(val) => handleFilterChange("patient_id", val)}
          >
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder="All Patient" />
            </SelectTrigger>
            <SelectContent>
              {patientOptions?.map((patient) => (
                <SelectItem key={patient?.value} value={patient?.value}>
                  {patient?.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(val) => handleFilterChange("status", val)}
          >
            <SelectTrigger className="min-w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {["pending", "approved", "rejected"].map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <input
            type="date"
            value={filters.start_date}
            onChange={(e) => handleFilterChange("start_date", e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={filters.end_date}
            onChange={(e) => handleFilterChange("end_date", e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={filters.consultation_date}
            onChange={(e) =>
              handleFilterChange("consultation_date", e.target.value)
            }
            className="border border-gray-200 rounded-md px-3 py-2 text-sm"
          />

          <Button onClick={() => refetch}>Search</Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <Button asChild>
          <Link to={`${healthcareUrl}/claims/file`}>
            <FaPlusCircle />
            File a claim
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={data?.data || []} />
    </section>
  );
};

export default HealthcareClaims;
