export const hospitalUrl = "/healthcare";
export const storefrontUrl = "/storefront";

export const hospitalSidebarRoutes = [
  { label: "Schedule", path: `${hospitalUrl}/schedule` },
  // { label: "Pharmacy", path: `${hospitalUrl}/pharmacy` },
  // { label: "Settings", path: `${hospitalUrl}/settings` },
  // { label: "Resources", path: `${hospitalUrl}/resources` },
  // { label: "Logout", path: `${hospitalUrl}/auth` },
];

export const storefrontSidebarRoutes = [
  { label: "Schedule", path: `${storefrontUrl}/schedule` },
  { label: "Pharmacy", path: `${storefrontUrl}/pharmacy` },
  { label: "Insurance", path: `${storefrontUrl}/insurance` },
  { label: "Logout", path: `${storefrontUrl}/auth` },
];
