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
import { useFetch } from "@/hooks/use-fetch";
import { insuranceCoverages, providers } from "@/lib/constants";
import { cn, getBadgeVarient } from "@/lib/utils";
import { insuranceUrl } from "@/routes/paths";
import type {
  InsuranceClaim,
  InsuranceClaimsResponse,
} from "@/types/insurance";
import { Link } from "react-router-dom";

const InsuranceClaims = () => {
  const { data } = useFetch<InsuranceClaimsResponse>(
    "/patient-claims/get_patient_claims_by_insurance_provider/",
    {
      useAuth: true,
      errorMessage: "Failed to load claims record",
    }
  );

  const columns: Column<InsuranceClaim>[] = [
    {
      header: "Claim Type",
      key: "claim_type",
      cellClassName: 'capitalize'
    },
    {
      header: "Diagnosis",
      key: "diagnosis",
    },
    {
      header: "Treatment Date",
      key: "treatment_date",
      render(row) {
        return new Date(row.treatment_date).toLocaleDateString();
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
        return new Date(row.created_at).toLocaleString();
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

  return (
    <section className="px-6">
      <div className="flex justify-between mb-6">
        <div className="flex gap-1">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All providers" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  {provider.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      <DataTable columns={columns} data={data?.data || []} />
    </section>
  );
};

export default InsuranceClaims;
