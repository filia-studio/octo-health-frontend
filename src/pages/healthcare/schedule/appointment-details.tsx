import React, { useState } from "react";
// import { Button, Dialog, TextField } from "@mui/material";
import type { Appointment } from "@/types/appointment";
import { useFetch } from "@/hooks/use-fetch";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CompleteAppointmentModal from "@/components/features/modals/complete-appointment";

const AppointmentDetails = () => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const { data } = useFetch<Appointment | null>(`appointment/${id}`, {
    useAuth: true,
    hideToast: "success",
    errorMessage: "Failed to fetch appointment details",
  });

  const appointment = data;

  const patient = appointment?.patient_details.user;
  const healthcare = appointment?.healthcare_details;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold">Appointment Details</h1>
      {appointment?.status !== "completed" && (
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-[12.5rem] bg-black !mt-4"
          >
            Mark Appointment as Completed
          </Button>
        </div>
      )}

      <section className="bg-white p-4 rounded-lg shadow space-y-2">
        <h2 className="text-lg font-semibold">Patient Information</h2>
        <p>
          <strong>Name:</strong> {patient?.first_name} {patient?.last_name}
        </p>
        <p>
          <strong>Email:</strong> {patient?.email}
        </p>
        <p>
          <strong>Phone:</strong> {patient?.contact_number}
        </p>
        <p>
          <strong>Gender:</strong> {patient?.gender}
        </p>
        <p>
          <strong>DOB:</strong> {patient?.date_of_birth}
        </p>
        <p>
          <strong>Address:</strong> {patient?.address}
        </p>
        <p>
          <strong>Patient Code:</strong>{" "}
          {appointment?.patient_details?.patient_code}
        </p>
      </section>

      {/* HEALTHCARE INFO */}
      <section className="bg-white p-4 rounded-lg shadow space-y-2">
        <h2 className="text-lg font-semibold">Healthcare Information</h2>
        <p>
          <strong>Name:</strong> {healthcare?.name}
        </p>
        <p>
          <strong>Type:</strong> {healthcare?.healthcare_type}
        </p>
        <p>
          <strong>Service:</strong> {healthcare?.healthcare_services[0]?.name}
        </p>
        <p>
          <strong>Address:</strong> {healthcare?.address}
        </p>
        <p>
          <strong>Phone:</strong> {healthcare?.contact_number}
        </p>
        <p>
          <strong>Email:</strong> {healthcare?.email}
        </p>
        <p>
          <strong>Website:</strong> {healthcare?.website}
        </p>
      </section>

      {/* APPOINTMENT INFO */}
      <section className="bg-white p-4 rounded-lg shadow space-y-2">
        <h2 className="text-lg font-semibold">Appointment Information</h2>
        <p>
          <strong>Date:</strong> {appointment?.date}
        </p>
        <p>
          <strong>Time:</strong> {appointment?.time}
        </p>
        <p>
          <strong>Visit Type:</strong> {appointment?.type_of_visit_display}
        </p>
        <p>
          <strong>Status:</strong> {appointment?.status}
        </p>
        <p>
          <strong>Attendant Comment:</strong> {""}
        </p>
      </section>

      <CompleteAppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        appointmentId={appointment?.id}
      />
    </div>
  );
};

export default AppointmentDetails;
