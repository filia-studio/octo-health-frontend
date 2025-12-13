export type Healthcare = {
  id: string;
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
  country: string;
  city: string;
  state: string;
  longitude: string;
  latitude: string;
  zipcode: string;
  healthcare_type: string;
  healthcare_services: { id: string; name: string }[];
};

export interface HealthcareListResponse {
  success: boolean;
  message: string;
  data: IHealthcare[];
}

export interface IHealthcare {
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
}

export type HealthcareService = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
};

export interface HealthcareClaimResponse {
  message: string;
  success: boolean;
  data: HealthcareClaim[];
}

export interface HealthcareClaim {
  id: string;
  claim_patient: string; // UUID of the patient filing the claim
  insurance_provider: string; // UUID of the insurance company
  diagnosis_icd_code: string; // e.g. "Malaria"
  consultation_date: string; // ISO or date string
  medical_report: string; // Free text summary
  treatment_procedure_note: string; // e.g. "Blood test, patient temperature, heartbeat rate"
  prescriptions_and_investigation_ordered: string; // e.g. "Paracetamol x3, Amatem Soft gel x2"
  invoice: string; // Cloudinary PDF link
  additional_documents: string; // Cloudinary PDF link
  healthcare_provider: string; // UUID of the hospital/clinic
  status: "pending" | "approved" | "rejected"; // Enum-like status
  created_at: string; // Timestamp
  updated_at: string; // Timestamp
  patients_details: {
    id: string;
    first_name: string;
    last_name: string;
    patient_code: string;
    photo: string;
  };
}
