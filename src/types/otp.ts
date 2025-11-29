import type { IInsuranceDetail } from "./patient";

export type HealthcareDetails = {
  id: string;
  healthcare_services: { id: string; name: string }[];
  account_name?: string | null;
  account_number?: string | null;
  bank?: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  address: string;
  contact_number: string;
  email: string;
  website: string;
  owner_name: string;
  license_number: string;
  tax_id_number: string;
  country: string | null;
  city: string | null;
  state: string | null;
  longitude: string | null;
  latitude: string | null;
  zipcode: string | null;
  healthcare_type: string;
  license_verified?: boolean;
  logo?: string;
  photo_1?: string;
  photo_2?: string;
  photo_3?: string;
};

export type OtpVerificationResponse = {
  success: boolean;
  message: string;
  data: {
    access: string;
    healthcare: HealthcareDetails;
  }
};

export interface PatientOtpVerificationResponse {
  success: boolean;
  message: string;
  data: {
    patient: Patient;
    refresh: string;
    access: string;
  };
}

export interface Patient {
  id: string;
  insurance_details: IInsuranceDetail[];
  user: User;
  created_at: string;
  updated_at: string;
  patient_code: string;
  longitude: string | null;
  latitude: string | null;
  zipcode: string | null;
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
