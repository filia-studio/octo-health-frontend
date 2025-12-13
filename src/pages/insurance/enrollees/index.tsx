import type { Column } from "@/components/features/common/data-table";
import DataTable from "@/components/features/common/data-table";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { insuranceUrl } from "@/routes/paths";
import type { Enrollee } from "@/types/insurance";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const InsuranceEnrollees = () => {
  const { data, isFetching } = useFetch<{ data: Enrollee[] }>(
    "/insurance-enrollee/list_enrollees/"
  );

  const columns: Column<Enrollee>[] = [
    {
      header: "Enrollee ID",
      key: "enrollee_id",
    },
    {
      header: "Full Name",
      key: "full_name",
    },
    {
      header: "Email",
      key: "email",
    },
    {
      header: "Phone Number",
      key: "phone_number",
    },
    {
      header: "Plan",
      key: "plan",
    },
    {
      header: "Balance",
      key: "balance",
    },
  ];

  return (
    <section className="px-6">
      <div className="flex justify-end items-end py-3 mb-4">
        <Button asChild>
          <Link to={`${insuranceUrl}/enrollees/create`}>
            <FaPlusCircle />
            Upload Enrollees
          </Link>
        </Button>
      </div>
      <DataTable
        loading={isFetching}
        columns={columns}
        data={data?.data ?? []}
      />
    </section>
  );
};

export default InsuranceEnrollees;
