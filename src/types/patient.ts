export interface IPatient {
  id: string;
  insurance_details: IInsuranceDetail[];
  user: IUser;
  created_at: string;
  updated_at: string;
  longitude: string | null;
  latitude: string | null;
  zipcode: string | null;
  patient_code?: string;
}

export interface IInsuranceDetail {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  insurance_type: string;
  hmo_id: string;
  insurance_plan: string;
  patient: string;
  insurance_provider_id: string;
}

export interface IUser {
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
  date_joined: string;
  contact_number: string;
  address: string;
  gender: "male" | "female" | string; // could restrict further
  user_type: "admin" | "patient" | "staff" | string; // extendable
  date_of_birth: string;
  groups: string[]; // looks like empty array of strings
  user_permissions: string[]; // same here
}

interface PatientDetails {
  id: number;
  photo: string | null;
  email: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  address: string;
  gender: string;
  date_of_birth: string;
}

export interface PatientClaim {
  id: string;
  claim_type: string;
  diagnosis: string;
  treatment_date: string;
  total_charges: string;
  status: string;
  reason: string | null;
  created_at: string;
  patient_details: PatientDetails;
  invoice: string[];
  payment_receipt: string[];
  supporting_documents: string[];
  insurance_provider: string;
  healthcare_provider: string;
}
