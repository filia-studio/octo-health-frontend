import DashboardOverview from "@/pages/dashboard/overview";
import StorefrontLayout from "@/components/features/layouts/storefront";
import StorefrontLogin from "@/pages/dashboard/storefront/auth/login";
import StorefrontInsurance from "@/pages/dashboard/storefront/insurance";
import StorefrontPharmacy from "@/pages/dashboard/storefront/pharmacy";
import StorefrontSchedule from "@/pages/dashboard/storefront/schedule";
import { Outlet, Route, Routes } from "react-router-dom";
import HospitalMgmtLayout from "@/components/features/layouts/hospital-mgmt";
import HMSchedule from "@/pages/hospital-management/schedule";
import HMPatient from "@/pages/hospital-management/schedule/patient";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="storefront" element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<StorefrontLogin />} />
        </Route>
        <Route element={<StorefrontLayout />}>
          <Route path="schedule" element={<StorefrontSchedule />} />
          <Route path="pharmacy" element={<StorefrontPharmacy />} />
          <Route path="insurance" element={<StorefrontInsurance />} />
        </Route>
      </Route>
      <Route path="hospital-mgmt" element={<HospitalMgmtLayout />}>
        <Route path="schedule" element={<HMSchedule />} />
        <Route path="schedule/:id" element={<HMPatient />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
