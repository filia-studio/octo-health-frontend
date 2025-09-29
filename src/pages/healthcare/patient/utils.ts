import type { IPatient } from "@/types/patient";

export function getPatientStats(patients: IPatient[]) {
  const totalPatients = patients.length;

  const activePatients = patients.filter((p) => p.user.is_active).length;

  const insuredPatients = patients.filter(
    (p) => Array.isArray(p.insurance_details) && p.insurance_details.length > 0
  ).length;

  const sorted = [...patients].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  let trend: {
    currentValue: number;
    previousValue: number;
    change: number;
    direction: "increase" | "decrease" | "no-change";
  } | null = null;

  if (sorted.length >= 2) {
    const previousValue = sorted.length - 1; // count of patients before latest
    const currentValue = sorted.length; // count of patients now
    const change = currentValue - previousValue;

    trend = {
      currentValue,
      previousValue,
      change,
      direction:
        change > 0 ? "increase" : change < 0 ? "decrease" : "no-change",
    };
  }

  return {
    totalPatients,
    activePatients,
    insuredPatients,
    trend,
  };
}

export const calculateAge = (dob: string | Date): number => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Adjust if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};
