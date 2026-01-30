import type { Route } from "@/types/common";

export const roleSelectionUrl = "/";
export const healthcareUrl = "/healthcare";
export const storefrontUrl = "/patient";
export const insuranceUrl = "/insurance";

export const hospitalSidebarRoutes: Route[] = [
  { label: "Appointments", path: `${healthcareUrl}/schedule` },
  { label: "Patients", path: `${healthcareUrl}/patient-management` },
  { label: "Claims", path: `${healthcareUrl}/claims` },
  {
    label: "Accounts",
    path: `${healthcareUrl}/accounts/profile`,
    subRoutes: [
      {
        label: "Profile Information",
        path: `${healthcareUrl}/accounts/profile`,
      },
      {
        label: "Payment Information",
        path: `${healthcareUrl}/accounts/payment`,
      },
      // { label: "Account Information", path: `${healthcareUrl}/accounts/info` },
    ],
  },
];

export const insuranceSidebarRoutes: Route[] = [
  { label: "Home", path: `${insuranceUrl}/home` },
  { label: "Claims", path: `${insuranceUrl}/claims` },
  { label: "Enrollees", path: `${insuranceUrl}/enrollees` },
  { label: "Procedures", path: `${insuranceUrl}/procedures` },
  { label: "Drugs", path: `${insuranceUrl}/drugs` },
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
      // { label: "Account Information", path: `${storefrontUrl}/accounts/info` },
    ],
  },
  // { label: "Pharmacy", path: `${storefrontUrl}/pharmacy` },
  // { label: "Insurance", path: `${storefrontUrl}/insurance` },
];
