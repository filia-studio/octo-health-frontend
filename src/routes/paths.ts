import type { Route } from "@/types/common";

export const hospitalUrl = "/healthcare";
export const storefrontUrl = "/patient";
export const insuranceUrl = "/insurance";

export const hospitalSidebarRoutes: Route[] = [
  { label: "Appointments", path: `${hospitalUrl}/schedule` },
  { label: "Patients", path: `${hospitalUrl}/patient-management` },
];

export const insuranceSidebarRoutes: Route[] = [
  { label: "Schedule", path: `${insuranceUrl}/schedule` },
  { label: "Claims", path: `${insuranceUrl}/claims` },
  // { label: "Patients", path: `${hospitalUrl}/patient-management` },
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
