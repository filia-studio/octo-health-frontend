import type { IHealthcare } from "@/types/healthcare";
import { type StateCreator } from "zustand";

export type HealthcareSlice = {
  healthcare: IHealthcare[];
  setHealthcare: (value: IHealthcare[]) => void;
  resetHealthcare: () => void;
};

const initialHealthcare: IHealthcare[] = [];

export const healthcareSlice: StateCreator<HealthcareSlice> = (set) => ({
  healthcare: initialHealthcare,

  setHealthcare: (value) => set({ healthcare: value }),

  resetHealthcare: () => set({ healthcare: initialHealthcare }),
});
