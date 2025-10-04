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
  healthcare_services: string[];
};

export interface HealthcareListResponse {
  success: boolean;
  message: string;
  data: IHealthcare[];
}

export interface IHealthcare {
  id: string;
  healthcare_services: string[];
  created_at: string; // ISO timestamp string
  updated_at: string; // ISO timestamp string
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
  logo: string;
  photo_1: string;
  photo_2: string;
  photo_3: string;
}

export type HealthcareService = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
};
