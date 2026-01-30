import type { IPatient } from "@/types/patient";
import { type StateCreator } from "zustand";

export type PatientSlice = {
  patient: IPatient | null;
  setPatient: (value: IPatient) => void;
  resetPatient: () => void;
};

const initialPatient: IPatient | null = null;

export const patientSlice: StateCreator<PatientSlice> = (set) => ({
  patient: initialPatient,

  setPatient: (value) => set({ patient: value }),

  resetPatient: () => set({ patient: initialPatient }),
});
