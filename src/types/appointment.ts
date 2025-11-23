import type { IHealthcare } from "./healthcare";
import type { IPatient } from "./patient";

export type ScheduleAppointment = {
  date: string;
  time: string;
  type_of_visit: string;
  healthcare: string;
  patient: string;
};

export type AppointmentStatus = "pending" | "approved" | "declined" | "cancelled" | "completed";

export type Appointment = {
  id: string;
  time: string;
  created_at: string;
  updated_at: string;
  date: string;
  type_of_visit: string;
  deactivation_reason: string | null;
  status: AppointmentStatus;
  is_active: boolean;
  healthcare: string;
  patient: string;
  approved_by: string | null;
  declined_by: string | null;
  healthcare_details: IHealthcare;
  patient_details: IPatient;
  type_of_visit_display: string;
};
