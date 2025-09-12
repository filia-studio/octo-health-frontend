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
import { insuranceCoverages, providers } from "@/lib/constants";
import { cn, getBadgeVarient } from "@/lib/utils";
import { storefrontUrl } from "@/routes/paths";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const StorefrontClaims = () => {
  const data = [
    {
      id: 1,
      provider: "Doren Hospital",
      code: "0000000",
      coverage: "Outpatient / Ambulatory Care",
      premium: "N450000",
      deductible: "N450000",
      usage: "2M/4M",
      status: "pending",
      date_filed: "2022-01-01",
    },
    {
      id: 2,
      provider: "Maxima Hospital",
      code: "0000000",
      coverage: "Hospitalization / Inpatient Care",
      premium: "N90000",
      deductible: "N90000",
      usage: "1M/10M",
      status: "approved",
      date_filed: "2022-01-01",
    },
  ];

  const columns: Column<(typeof data)[0]>[] = [
    {
      header: "Provider",
      key: "provider",
    },
    {
      header: "Code",
      key: "code",
    },
    {
      header: "Coverage",
      key: "coverage",
    },
    {
      header: "Premium",
      key: "premium",
    },
    {
      header: "Deductible",
      key: "deductible",
    },
    {
      header: "Usage",
      key: "usage",
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
      header: "Date Filed",
      key: "date_filed",
    },
  ];

  return (
    <section>
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
        <Button asChild>
          <Link to={`${storefrontUrl}/claims/file`}>
            <FaPlusCircle />
            File a claim
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </section>
  );
};

export default StorefrontClaims;
