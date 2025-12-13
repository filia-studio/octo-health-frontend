import type { IHealthcare } from "./healthcare";

export interface InsuranceProvider {
  id: string;
  name: string;
  hmo_id: string;
}

export interface InsuranceProviderListResponse {
  id: string;
  created_at: string;
  updated_at: string;
  accreditation_number: string;
  address: string;
  email: string;
  phone_number: string;
  accreditation_verified: boolean;
  insurance: InsuranceProvider;
}

export interface InsuranceClaimsResponse {
  success: boolean;
  message: string;
  data: InsuranceClaim[];
}

export interface InsuranceClaim {
  id: string;
  supporting_documents: string;
  invoice: string;
  payment_receipt: string;
  patient_details: PatientDetails;
  created_at: string;
  updated_at: string;
  claim_type: string;
  healthcare_provider: string;
  total_charges: string;
  treatment_date: string;
  diagnosis: string;
  payment_reciept: string;
  status: string;
  reason: string | null;
  patient: number;
  insurance_provider: string;
}

export interface PatientDetails {
  id: number;
  photo: string | null;
  email: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  address: string;
  gender: "male" | "female" | string;
  date_of_birth: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: VerifyOtpData;
}

export interface VerifyOtpData {
  access: string;
  data: InsuranceData;
}

export interface InsuranceData {
  id: string;
  created_at: string;
  updated_at: string;
  accreditation_number: string;
  address: string;
  email: string;
  phone_number: string;
  accreditation_verified: boolean;
  insurance: Insurance;
}

export interface Insurance {
  id: string;
  name: string;
  hmo_id: string;
}

export type HealthcareInsuranceClaim = {
  id: string;
  claim_patient: string;
  insurance_provider: string;
  diagnosis_icd_code: string;
  consultation_date: string;
  medical_report: string;
  treatment_procedure_note: string;
  prescriptions_and_investigation_ordered: string;
  invoice: string | null;
  additional_documents: string | null;
  healthcare_provider: string;
  status: string;
  appointment_details: string | null;
  patients_details: PatientDetails;
  insurance_details: Omit<Insurance, "hmo_id">;
  created_at: string;
  updated_at: string;
  healthcare_account_details: IHealthcare;
};

export interface HealthcareInsuranceClaimsResponse {
  success: boolean;
  message: string;
  data: HealthcareInsuranceClaim[];
}

export type Enrollee = {
  enrollee_id: string;
  full_name: string;
  email: string;
  phone_number: string;
  plan: string;
  balance: string;
};
