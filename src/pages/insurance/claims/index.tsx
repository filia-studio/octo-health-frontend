import DataTable, {
  type Column,
} from "@/components/features/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tabs from "@/components/ui/tabs-v2";
import { useFetch } from "@/hooks/use-fetch";
import { insuranceCoverages } from "@/lib/constants";
import { cn, getBadgeVarient } from "@/lib/utils";
import { insuranceUrl } from "@/routes/paths";
import type {
  HealthcareInsuranceClaim,
  HealthcareInsuranceClaimsResponse,
  InsuranceClaim,
  InsuranceClaimsResponse,
} from "@/types/insurance";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";

const InsuranceClaims = () => {
  const [activeTab, setActiveTab] = useState("Insured");
  const { data: patientData } = useFetch<InsuranceClaimsResponse>(
    "/patient-claims/get_patient_claims_by_insurance_provider/",
    {
      useAuth: true,
      enabled: activeTab === "Insured",
      errorMessage: "Failed to load claims record",
      hideToast: "success",
    }
  );
  const { data: healthcareData } = useFetch<HealthcareInsuranceClaimsResponse>(
    "/healthcare-claim/get_healthcare_claims_by_insurance_provider/",
    {
      useAuth: true,
      enabled: activeTab === "Providers",
      errorMessage: "Failed to load claims record",
      hideToast: "success",
    }
  );

  const patientColumns: Column<InsuranceClaim>[] = [
    {
      header: "Claim Type",
      key: "claim_type",
      cellClassName: "capitalize",
    },
    {
      header: "Diagnosis",
      key: "diagnosis",
    },
    {
      header: "Treatment Date",
      key: "treatment_date",
      render(row) {
        return dayjs(row.treatment_date.split("T")[0]).format("DD MMM, YYYY");
      },
    },
    {
      header: "Total Charges",
      key: "total_charges",
      render(row) {
        return `₦${Number(row.total_charges).toLocaleString()}`;
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
        return dayjs(row.created_at.split("T")[0]).format("DD MMM, YYYY");
      },
    },
    {
      header: "",
      key: "",
      render(row) {
        return (
          <div className="flex justify-end">
            <Link
              to={`${insuranceUrl}/claims/${row.id}`}
              state={{ claim: row }}
              className="text-sm text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        );
      },
    },
  ];

  const healthcareColumns: Column<HealthcareInsuranceClaim>[] = [
    {
      header: "Patient",
      key: "claim_patient",
      cellClassName: "capitalize",
      render(row) {
        return row.patients_details.first_name + " " + row.patients_details.last_name;
      },
    },
    {
      header: "Diagnosis",
      key: "diagnosis_icd_code",
    },
    {
      header: "Consultation Date",
      key: "consultation_date",
      render(row) {
        return dayjs(row.consultation_date.split("T")[0]).format(
          "DD MMM, YYYY"
        );
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
        return dayjs(row.created_at.split("T")[0]).format("DD MMM, YYYY");
      },
    },
    {
      header: "",
      key: "",
      render(row) {
        return (
          <div className="flex justify-end">
            <Link
              to={`${insuranceUrl}/claims/${row.id}`}
              state={{ claim: row, type: "healthcare" }}
              className="text-sm text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <section className="px-6">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All coverages" />
              </SelectTrigger>
              <SelectContent>
                {insuranceCoverages.map((coverage) => (
                  <SelectItem key={coverage} value={coverage}>
                    {coverage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
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
            <Button>Search</Button>
            <Button variant="outline">Reset</Button>
          </div>
        </div>
        <Tabs
          tabs={["Insured", "Providers"]}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
          }}
        />
      </div>
      {activeTab === "Insured" && (
        <DataTable columns={patientColumns} data={patientData?.data || []} />
      )}
      {activeTab === "Providers" && (
        <DataTable
          columns={healthcareColumns}
          data={healthcareData?.data || []}
        />
      )}
    </section>
  );
};

export default InsuranceClaims;
