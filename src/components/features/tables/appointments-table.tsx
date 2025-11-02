import type { Appointment, HealthcareAppointment } from "@/types/appointment";
import DataTable, { type Column } from "../common/data-table";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { cn, getBadgeVarient } from "@/lib/utils";
import { useState } from "react";
import ActionPopover from "../popovers/action";
import AppointmentModal from "../modals/appointment";
import { useSend } from "@/hooks/use-send";

type AppointmentsTableProps = {
  isLoading: boolean;
  data: (Appointment | HealthcareAppointment)[];
  type?: "patient" | "healthcare";
  refresh?: () => void;
};

const AppointmentsTable = ({
  isLoading,
  data,
  type = "healthcare",
  refresh,
}: AppointmentsTableProps) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("");
  const [appointment, setAppointment] = useState<Appointment>();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const { mutate: approveAppointment, isPending: approving } = useSend(
    `/appointment/${appointment?.id}/approve_appointment/`,
    {
      successMessage: "Appointment has been approved",
      onSuccess: () => {
        refresh?.();
      },
    }
  );

  const { mutate: declineAppointment, isPending: declining } = useSend(
    `/appointment/${appointment?.id}/decline_appointment/`,
    {
      successMessage: "Appointment has been declined",
      onSuccess: () => {
        refresh?.();
      },
    }
  );

  const healthcareColumns: Column<HealthcareAppointment>[] = [
    {
      header: "Patient",
      key: "patient",
      render: (row) => (
        <div
          onClick={() =>
            navigate(`${row?.patient_details?.id}`, {
              state: { patient: row?.patient_details },
            })
          }
          className="text-white"
        >
          {row?.patient_details?.user?.first_name}{" "}
          {row?.patient_details?.user?.last_name}
        </div>
      ),
    },
    {
      header: "Type",
      key: "type_of_visit_display",
    },
    {
      header: "Date",
      key: "date",
      render: (row) => dayjs(row?.date).format("MMMM D, YYYY"),
    },
    {
      header: "Time",
      key: "time",
    },
    {
      header: "Status",
      key: "status",
      render: (row) => (
        <Badge className={cn(getBadgeVarient(row?.status), "capitalize")}>
          {row?.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <ActionPopover
          open={selected === row?.id}
          toggle={() => {
            setSelected(selected ? "" : row?.id);
            setAppointment(row);
          }}
          options={[
            {
              title: "View",
              onClick: () => {
                setOpenDetailsModal(true);
              },
            },
            ...(row.status === "pending"
              ? [
                  {
                    title: "Approve",
                    onClick: () => approveAppointment({ notes: "Approved" }),
                    isLoading: approving,
                  },
                  {
                    title: "Decline",
                    onClick: () =>
                      declineAppointment({ deactivation_reason: "Declined" }),
                    isLoading: declining,
                  },
                ]
              : []),
          ]}
        />
      ),
    },
  ];
  const patientColumns: Column<Appointment>[] = [
    {
      header: "Type",
      key: "type_of_visit_display",
    },
    {
      header: "Date",
      key: "date",
      render: (row) => dayjs(row?.date).format("MMMM D, YYYY"),
    },
    {
      header: "Time",
      key: "time",
    },
    {
      header: "Status",
      key: "status",
      render: (row) => <Badge>{row?.status}</Badge>,
    },
  ];
  const columns = type === "patient" ? patientColumns : healthcareColumns;
  return (
    <>
      <DataTable
        loading={isLoading}
        columns={columns}
        data={(data as unknown as HealthcareAppointment[]) || []}
      />
      <AppointmentModal
        isPatientView={type === "patient"}
        open={openDetailsModal}
        onOpenChange={() => setOpenDetailsModal(!openDetailsModal)}
        appointment={appointment}
      />
    </>
  );
};

export default AppointmentsTable;
