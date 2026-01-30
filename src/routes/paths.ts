import type { Route } from "@/types/common";

export const roleSelectionUrl = "/";
export const healthcareUrl = "/healthcare";
export const storefrontUrl = "/patient";
export const insuranceUrl = "/insurance";

export const hospitalSidebarRoutes: Route[] = [
  { label: "Appointments", path: `${healthcareUrl}/schedule` },
  { label: "Patients", path: `${healthcareUrl}/patient-management` },
  { label: "Claims", path: `${healthcareUrl}/claims` },
];

export const insuranceSidebarRoutes: Route[] = [
  { label: "Schedule", path: `${insuranceUrl}/schedule` },
  { label: "Claims", path: `${insuranceUrl}/claims` },
  // { label: "Patients", path: `${healthcareUrl}/patient-management` },
];

export const storefrontSidebarRoutes: Route[] = [
  { label: "Appointments", path: `${storefrontUrl}/schedule` },
  { label: "Claims", path: `${storefrontUrl}/claims` },
  { label: "Providers", path: `${storefrontUrl}/providers` },
  {
    label: "Accounts",
    path: `${storefrontUrl}/accounts/profile`,
    subRoutes: [
      {
        label: "Profile Information",
        path: `${storefrontUrl}/accounts/profile`,
      },
      {
        label: "Payment Information",
        path: `${storefrontUrl}/accounts/payment`,
      },
      { label: "Account Information", path: `${storefrontUrl}/accounts/info` },
    ],
  },
  // { label: "Pharmacy", path: `${storefrontUrl}/pharmacy` },
  // { label: "Insurance", path: `${storefrontUrl}/insurance` },
];
