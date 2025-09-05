export type HealthcareDetails = {
  id: string;
  healthcare_services: string[];
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
};

export type OtpVerificationResponse = {
  success: boolean;
  message: string;
  data: {
    access: string;
    healthcare: {
      id: string;
      healthcare_services: string[];
      created_at: string; // ISO datetime string
      updated_at: string; // ISO datetime string
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
    };
  };
};
