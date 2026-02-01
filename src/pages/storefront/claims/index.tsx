import DataTable, {
  type Column,
} from "@/components/features/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type {
  InsuranceClaim,
  InsuranceClaimsResponse,
} from "@/types/insurance";
import { useMemo, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const StorefrontClaims = () => {
  const [filters, setFilters] = useState({
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
      hideToast: "success",
      errorMessage: "Failed to load claims record",
    },
  );

  const columns: Column<InsuranceClaim>[] = [
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
        const raw = row?.created_at;

        const iso = raw.replace(
          /^(\d{2})-(\d{2})-(\d{4})/,
          (_, mm, dd, yyyy) => `${yyyy}-${mm}-${dd}`,
        );

        return new Date(iso).toLocaleDateString() || "";
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
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Claims</h1>
        <Button asChild>
          <Link to={`${storefrontUrl}/claims/file`}>
            <FaPlusCircle className="mr-2" />
            File a claim
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select
                value={filters.status}
                onValueChange={(val) => handleFilterChange("status", val)}
              >
                <SelectTrigger className="h-10 w-full rounded-md border-input">
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
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Start Date</Label>
              <Input
                type="date"
                value={filters.start_date}
                onChange={(e) =>
                  handleFilterChange("start_date", e.target.value)
                }
                className="h-10 w-full rounded-md border-input"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">End Date</Label>
              <Input
                type="date"
                value={filters.end_date}
                onChange={(e) => handleFilterChange("end_date", e.target.value)}
                className="h-10 w-full rounded-md border-input"
              />
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <Button
                onClick={() => refetch()}
                className="h-10 px-8 rounded-md w-1/2"
              >
                Search
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="h-10 px-8 rounded-md w-1/2"
              >
                Clear filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DataTable columns={columns} data={data?.data || []} />
    </section>
  );
};

export default StorefrontClaims;
