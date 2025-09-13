import StorefrontLayout from "@/components/features/layouts/storefront";
import StorefrontLogin from "@/pages/storefront/auth/login";
import StorefrontInsurance from "@/pages/storefront/insurance";
import StorefrontPharmacy from "@/pages/storefront/pharmacy";
import StorefrontSchedule from "@/pages/storefront/schedule";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HospitalMgmtLayout from "@/components/features/layouts/hospital-mgmt";
import HMSchedule from "@/pages/hospital-management/schedule";
import HMPatient from "@/pages/hospital-management/schedule/patient";
import HospitalLogin from "@/pages/hospital-management/auth/login";
import Nurse from "@/pages/hospital-management/schedule/nurse";
import PharmacyInvoice from "@/pages/storefront/pharmacy/invoice";
import VerifyOTP from "@/pages/hospital-management/auth/verify-otp";
import { hospitalUrl, storefrontUrl } from "./paths";
import PatientRegistration from "@/pages/hospital-management/patient/create";
import PatientManagement from "@/pages/hospital-management/patient";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={storefrontUrl} element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<StorefrontLogin />} />
        </Route>
        <Route element={<StorefrontLayout />}>
          <Route path="schedule" element={<StorefrontSchedule />} />
          <Route path="pharmacy" element={<StorefrontPharmacy />} />
          <Route path="insurance" element={<StorefrontInsurance />} />
          <Route path="pharmacy/invoice" element={<PharmacyInvoice />} />
        </Route>
      </Route>
      <Route path={hospitalUrl} element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<HospitalLogin />} />
          <Route path="login" element={<VerifyOTP />} />
        </Route>
        <Route element={<HospitalMgmtLayout />}>
          <Route path="schedule" element={<HMSchedule />} />
          <Route path="schedule/:id" element={<HMPatient />} />
          <Route path="nurse" element={<Nurse />} />
          <Route path="patient-management" element={<PatientManagement />} />
          <Route
            path="patient-management/create-patient"
            element={<PatientRegistration />}
          />
        </Route>
        <Route
          index
          path="*"
          element={<Navigate to={`${hospitalUrl}/auth`} />}
        />
      </Route>
      <Route path="*" element={<Navigate to={`${storefrontUrl}/auth`} />} />
    </Routes>
  );
};

export default AppRouter;
