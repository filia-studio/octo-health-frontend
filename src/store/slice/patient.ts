import type { Patient } from "@/types/otp";
import { type StateCreator } from "zustand";

export type PatientSlice = {
  patient: Patient | null;
  setPatient: (value: Patient) => void;
  resetPatient: () => void;
};

const initialPatient: Patient | null = null;

export const patientSlice: StateCreator<PatientSlice> = (set) => ({
  patient: initialPatient,

  setPatient: (value) => set({ patient: value }),

  resetPatient: () => set({ patient: initialPatient }),
});
