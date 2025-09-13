export const DashboardModule = {
  Hospital: "hospital",
  Storefront: "storefront",
} as const;

export type Route = {
  label: string;
  path: string;
  subRoutes?: Route[];
}
