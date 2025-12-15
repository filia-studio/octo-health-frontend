import DataTable, {
  type Column,
} from "@/components/features/common/data-table";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { formatAPIDate } from "@/lib/utils";
import { insuranceUrl } from "@/routes/paths";
import type { Procedure } from "@/types/insurance";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const InsuranceProcedures = () => {
  const { data, isFetching } = useFetch<{ data: Array<Procedure> }>(
    "/insurance-procedure-detail/list_procedures/"
  );

  const columns: Column<Procedure>[] = [
    {
      header: "Procedure Code",
      key: "procedure_code",
    },
    {
      header: "Procedure",
      key: "procedure",
    },
    {
      header: "Amount",
      key: "amount",
    },
    {
      header: "Date Added",
      key: "created_at",
      render: (row) => {
        return <span>{formatAPIDate(row.created_at)}</span>;
      },
    },
    {
      header: "Date Updated",
      key: "updated_at",
      render: (row) => {
        return <span>{formatAPIDate(row.updated_at)}</span>;
      },
    },
  ];

  return (
    <section className="px-6">
      <div className="flex justify-end items-end py-3 mb-4">
        <Button asChild>
          <Link to={`${insuranceUrl}/procedures/create`}>
            <FaPlusCircle />
            Upload Procedures
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

export default InsuranceProcedures;
