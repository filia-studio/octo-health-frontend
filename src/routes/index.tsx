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
import StorefrontClaims from "@/pages/storefront/claims";
import StorefrontFileClaim from "@/pages/storefront/claims/file";
import StorefrontProviders from "@/pages/storefront/providers";
import StorefrontAccountInformation from "@/pages/storefront/accounts/account-info";
import StorefrontPaymentInformation from "@/pages/storefront/accounts/payment-info";
import StorefrontProfileInformation from "@/pages/storefront/accounts/profile-info";
import CreatePatient from "@/pages/hospital-management/patient/create";
import PatientSignup from "@/pages/hospital-management/auth/patient-signup";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={storefrontUrl} element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<StorefrontLogin />} />
          <Route path="patient-registration" element={<PatientSignup />} />
        </Route>
        <Route element={<StorefrontLayout />}>
          <Route path="schedule" element={<StorefrontSchedule />} />
          <Route path="claims" element={<Outlet />}>
            <Route index element={<StorefrontClaims />} />
            <Route path="file" element={<StorefrontFileClaim />} />
          </Route>
          <Route path="pharmacy" element={<Outlet />}>
            <Route index element={<StorefrontPharmacy />} />
            <Route path="invoice" element={<PharmacyInvoice />} />
          </Route>
          <Route path="providers" element={<Outlet />}>
            <Route index element={<StorefrontProviders />} />
          </Route>
          <Route path="accounts" element={<Outlet />}>
            <Route path="info" element={<StorefrontAccountInformation />} />
            <Route path="payment" element={<StorefrontPaymentInformation />} />
            <Route path="profile" element={<StorefrontProfileInformation />} />
            <Route
              path="*"
              element={<Navigate to={`${storefrontUrl}/accounts/profile`} />}
            />
          </Route>
          <Route path="insurance" element={<StorefrontInsurance />} />
        </Route>
      </Route>
      <Route path={hospitalUrl} element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<HospitalLogin />} />
          <Route path="login" element={<VerifyOTP />} />
        </Route>
        <Route element={<HospitalMgmtLayout />}>
          <Route path="schedule" element={<Outlet />}>
            <Route index element={<HMSchedule />} />
            <Route path=":id" element={<HMPatient />} />
          </Route>
          <Route path="nurse" element={<Nurse />} />
          <Route path="patient-management" element={<PatientManagement />} />
          <Route path="patient-management/create" element={<CreatePatient />} />
          <Route path="patient-management/:id" element={<HMPatient />} />
          <Route path="services/:id" element={<div>Services</div>} />
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
