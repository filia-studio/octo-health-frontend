import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ls from "localstorage-slim";

ls.config.storage = sessionStorage;

export const setLS = (key: string, value: unknown) => {
  return ls.set(key, value, { encrypt: true });
};

export const getLS = <T>(key: string): T => {
  return ls.get(key, { decrypt: true }) as T;
};

export const removeLS = (key: string) => {
  return ls.remove(key);
};

export const clearLS = () => {
  return ls.clear();
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBadgeVarient = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-[#FFCDD2] text-[#C62828]";
    case "approved":
      return "bg-[#C8E6C9] text-[#2E7D32]";
    case "rejected":
      return "bg-[#FFCDD2] text-[#C62828]";
    default:
      return "bg-[#C8E6C9] text-[#2E7D32]";
  }
};

export function removeEmptyFields<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj
      .map((item) => removeEmptyFields(item))
      .filter((item) => Object.keys(item as object).length > 0) as T;
  }

  if (typeof obj === "object" && obj !== null) {
    const cleaned: any = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (
        value !== "" &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        cleaned[key] = removeEmptyFields(value);
      }
    });
    return cleaned as T;
  }

  return obj;
}

export const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
