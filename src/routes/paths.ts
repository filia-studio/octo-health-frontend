export const hospitalUrl = "/healthcare";
export const storefrontUrl = "/storefront";

export const hospitalSidebarRoutes = [
  { label: "Appointments", path: `${hospitalUrl}/schedule` },
  { label: "Patients", path: `${hospitalUrl}/patient-management` },
  // {
  //   label: "Healthcare Providers",
  //   path: `${hospitalUrl}/healthcare-providers`,
  // },
  // { label: "Accounts", path: `${hospitalUrl}/accounts` },
];

export const storefrontSidebarRoutes = [
  { label: "Schedule", path: `${storefrontUrl}/schedule` },
  { label: "Pharmacy", path: `${storefrontUrl}/pharmacy` },
  { label: "Insurance", path: `${storefrontUrl}/insurance` },
  { label: "Logout", path: `${storefrontUrl}/auth` },
];
