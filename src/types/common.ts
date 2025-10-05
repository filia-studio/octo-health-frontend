export const DashboardModule = {
  Hospital: "hospital",
  Storefront: "storefront",
  Insurance: "insurance",
} as const;

export type Route = {
  label: string;
  path: string;
  subRoutes?: Route[];
};

export type Address = {
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  latitude: string | number;
  longitude: string | number;
};
