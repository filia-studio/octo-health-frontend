import type { IHealthcare } from "./healthcare";
import type { IPatient } from "./patient";

export type OtpVerificationResponse = {
  success: boolean;
  message: string;
  data: {
    access: string;
    healthcare: IHealthcare;
  }
};

export interface PatientOtpVerificationResponse {
  success: boolean;
  message: string;
  data: {
    patient: IPatient;
    refresh: string;
    access: string;
  };
}

export interface User {
  id: number;
  password: string;
  last_login: string | null;
  photo: string | null;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  date_joined: string; // ISO datetime string
  contact_number: string;
  address: string;
  gender: "male" | "female" | string; // expand if more genders possible
  user_type: "patient" | "doctor" | "admin" | string; // adjust as needed
  date_of_birth: string; // YYYY-MM-DD format
  groups: unknown[];
  user_permissions: unknown[];
}
