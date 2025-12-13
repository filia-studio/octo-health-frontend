import React, { useState } from "react";
import ScheduleTabs from "@/components/features/tabs/schedule-tabs";
import OverViewCard from "@/components/features/cards/overview";
import DataTable, {
  type Column,
} from "@/components/features/common/data-table";
import type {
  InsuranceClaim,
  InsuranceClaimsResponse,
} from "@/types/insurance";
import { useFetch } from "@/hooks/use-fetch";
import { Badge } from "@/components/ui/badge";
import { cn, getBadgeVarient } from "@/lib/utils";
import PatientsTable from "@/components/features/tables/patients-table";

export const tabs = ["Subscribers", "Claims", "Plans", "Network"];
export const overview = [
  {
    label: "Total Subscribers",
    value: "1300",
    // change: "5%",
    // changeColor: "text-green-600",
  },
  {
    label: "Total Claims",
    value: "1000",
    // change: "10%",
    // changeColor: "text-green-600",
  },
  {
    label: "Total Hospitals",
    value: "2000",
    // change: "20%",
    // changeColor: "text-red-600",
  },
  // {
  //   label: "Total Claims",
  //   value: "1000",
  //   change: "10%",
  //   changeColor: "text-green-600",
  // },
  // {
  //   label: "Total Staff",
  //   value: "2000",
  //   change: "20%",
  //   changeColor: "text-red-600",
  // },
];

const InsuranceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Subscribers");

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
        return new Date(row.created_at).toLocaleString();
      },
    },
    // {
    //   header: "",
    //   key: "",
    //   render(row) {
    //     return (
    //       <div className="flex justify-end">
    //         <Link
    //           to={`${insuranceUrl}/claims/${row.id}`}
    //           state={{ claim: row }}
    //           className="text-sm text-blue-600 hover:underline"
    //         >
    //           View Details
    //         </Link>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="px-4">
      <OverViewCard data={overview} />
      <ScheduleTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div>
        {activeTab === "Subscribers" && <PatientsTable patientData={[]} />}
        {activeTab === "Claims" && (
          <DataTable columns={columns} data={data?.data || []} />
        )}
      </div>
    </div>
  );
};

export default InsuranceDashboard;
