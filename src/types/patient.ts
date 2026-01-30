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
