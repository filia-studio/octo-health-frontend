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
import { cn, getBadgeVarient } from "@/lib/utils";
import { storefrontUrl } from "@/routes/paths";
import type { HealthcareListResponse } from "@/types/healthcare";
import type {
  InsuranceClaim,
  InsuranceClaimsResponse,
  InsuranceProviderListResponse,
} from "@/types/insurance";
import { useMemo, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const StorefrontClaims = () => {
  const [filters, setFilters] = useState({
    // consultation_date: "",
    end_date: "",
    healthcare_provider: "",
    insurance_provider: "",
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

  const { data, refetch } = useFetch<InsuranceClaimsResponse>(
    `patient-claims/my-claims?${query}`,
    {
      useAuth: true,
      errorMessage: "Failed to load claims record",
    }
  );

  const { data: insuranceProviders } = useFetch<
    InsuranceProviderListResponse[]
  >("insurance_provider/", {
    useAuth: false,
    errorMessage: "Failed to load insurance providers",
  });

  const { data: healthcareProviderResponse } = useFetch<HealthcareListResponse>(
    "healthcare/",
    {
      useAuth: false,
      errorMessage: "Failed to load healthcare providers",
    }
  );

  const columns: Column<InsuranceClaim>[] = [
    {
      header: "Claim Type",
      key: "claim_type",
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
              to={`${storefrontUrl}/claims/${row.id}`}
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

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      end_date: "",
      healthcare_provider: "",
      insurance_provider: "",
      start_date: "",
      status: "",
    });
    refetch();
  };

  return (
    <section>
      <div className="flex justify-between mb-6">
        <div className="flex gap-1">
          <Select
            value={filters?.healthcare_provider}
            onValueChange={(val) =>
              handleFilterChange("healthcare_provider", val)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Healthcare providers" />
            </SelectTrigger>
            <SelectContent>
              {healthcareProviderResponse?.data?.map((provider) => (
                <SelectItem key={provider.id} value={provider?.name}>
                  {provider?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters?.insurance_provider}
            onValueChange={(val) =>
              handleFilterChange("insurance_provider", val)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Insurance Providers" />
            </SelectTrigger>
            <SelectContent>
              {insuranceProviders?.map((provider) => (
                <SelectItem key={provider?.id} value={provider?.id}>
                  {provider?.insurance?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.status}
            onValueChange={(val) => handleFilterChange("status", val)}
          >
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
          <Button>Search</Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <Button asChild>
          <Link to={`${storefrontUrl}/claims/file`}>
            <FaPlusCircle />
            File a claim
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data?.data || []} />
    </section>
  );
};

export default StorefrontClaims;
