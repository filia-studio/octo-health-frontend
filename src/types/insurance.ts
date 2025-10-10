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
