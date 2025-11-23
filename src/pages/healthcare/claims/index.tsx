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
import { useFetch } from "@/hooks/use-fetch";
import { healthcareUrl } from "@/routes/paths";
import type { HealthcareClaimResponse } from "@/types/healthcare";
import HealthcareClaimsTable from "@/components/features/tables/healthcare-claims-table";

const HealthcareClaims = () => {
  const [filters, setFilters] = useState({
    consultation_date: "",
    end_date: "",
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

  const { data, refetch } = useFetch<HealthcareClaimResponse>(
    `healthcare-claim/my_claims?${query}`,
    {
      useAuth: true,
      hideToast: "success",
      errorMessage: "Failed to load claims record",
    }
  );

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      consultation_date: "",
      end_date: "",
      start_date: "",
      status: "",
    });
    refetch();
  };

  return (
    <section className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          <Select
            value={filters.status}
            onValueChange={(val) => handleFilterChange("status", val)}
          >
            <SelectTrigger className="min-w-[10rem] capitalize">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              {["pending", "approved", "rejected"].map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
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

      <HealthcareClaimsTable data={data?.data || []} />
    </section>
  );
};

export default HealthcareClaims;
