import { getLS, removeLS, setLS } from "@/lib/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authSlice, type AuthSlice } from "./slice/auth";
import { healthcareSlice, type HealthcareSlice } from "./slice/healthcare";
import { patientSlice, type PatientSlice } from "./slice/patient";

export type Store = AuthSlice & HealthcareSlice & PatientSlice;

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...authSlice(...a),
      ...healthcareSlice(...a),
      ...patientSlice(...a),
    }),
    {
      name: "octo_health_frontend",
      storage: {
        getItem: getLS,
        setItem: setLS,
        removeItem: removeLS,
      },
    }
  )
);
