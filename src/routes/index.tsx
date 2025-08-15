import DashboardOverview from "@/pages/dashboard/overview";
import StorefrontLogin from "@/pages/dashboard/storefront/auth/login";
import { Outlet, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="storefront" element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<StorefrontLogin />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
