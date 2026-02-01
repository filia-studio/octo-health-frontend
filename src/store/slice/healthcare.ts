import type { HealthcareFacility, IHealthcare } from "@/types/healthcare";
import { type StateCreator } from "zustand";

export type HealthcareSlice = {
  healthcare: IHealthcare[];
  facilities: HealthcareFacility[];
  setHealthcare: (value: IHealthcare[]) => void;
  resetHealthcare: () => void;
  setFacilities: (value: HealthcareFacility[]) => void;
};

const initialHealthcare: IHealthcare[] = [];

const initialFacilities: HealthcareFacility[] = [];

export const healthcareSlice: StateCreator<HealthcareSlice> = (set) => ({
  healthcare: initialHealthcare,

  setHealthcare: (value) => set({ healthcare: value }),

  resetHealthcare: () => set({ healthcare: initialHealthcare }),

  facilities: initialFacilities,

  setFacilities: (value) => set({ facilities: value }),
});
