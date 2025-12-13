import type { IHealthcare } from "@/types/healthcare";
import type { InsuranceData } from "@/types/insurance";
import type { IPatient } from "@/types/patient";
import { type StateCreator } from "zustand";

export interface HealthcareAuth {
  token: string;
  details: IHealthcare | null;
}

export interface InsuranceAuth {
  token: string;
  details: InsuranceData | null;
}

export interface PatientAuth {
  token: string;
  details: IPatient | null;
}

export type AuthSlice = {
  healthcareAuth: HealthcareAuth;
  insuranceAuth: InsuranceAuth;
  patientAuth: PatientAuth;

  setHealthcareAuth: (value: Partial<HealthcareAuth>) => void;
  setInsuranceAuth: (value: Partial<InsuranceAuth>) => void;
  setPatientAuth: (value: Partial<PatientAuth>) => void;

  resetHealthcareAuth: () => void;
  resetInsuranceAuth: () => void;
  resetPatientAuth: () => void;
};

const defaults = {
  healthcareAuth: {
    token: "",
    details: null,
  },
  insuranceAuth: {
    token: "",
    details: null,
  },
  patientAuth: {
    token: "",
    details: null,
  },
};

export const authSlice: StateCreator<AuthSlice> = (set, get) => ({
  ...defaults,

  setHealthcareAuth: (value) =>
    set({ healthcareAuth: { ...get().healthcareAuth, ...value } }),

  setInsuranceAuth: (value) =>
    set({ insuranceAuth: { ...get().insuranceAuth, ...value } }),

  setPatientAuth: (value) =>
    set({ patientAuth: { ...get().patientAuth, ...value } }),

  resetHealthcareAuth: () => set({ healthcareAuth: defaults.healthcareAuth }),
  resetInsuranceAuth: () => set({ insuranceAuth: defaults.insuranceAuth }),
  resetPatientAuth: () => set({ patientAuth: defaults.patientAuth }),
});
