import StorefrontLayout from "@/components/features/layouts/storefront";
import StorefrontLogin from "@/pages/storefront/auth/login";
import StorefrontInsurance from "@/pages/storefront/insurance";
import StorefrontPharmacy from "@/pages/storefront/pharmacy";
import StorefrontSchedule from "@/pages/storefront/schedule";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HospitalMgmtLayout from "@/components/features/layouts/hospital-mgmt";
import HMSchedule from "@/pages/healthcare/schedule";
import HMPatient from "@/pages/healthcare/schedule/patient";
import HospitalLogin from "@/pages/healthcare/auth/login";
import Nurse from "@/pages/healthcare/schedule/nurse";
import PharmacyInvoice from "@/pages/storefront/pharmacy/invoice";
import VerifyOTP from "@/pages/healthcare/auth/verify-otp";
import { healthcareUrl, insuranceUrl, storefrontUrl } from "./paths";
import PatientManagement from "@/pages/healthcare/patient";
import StorefrontClaims from "@/pages/storefront/claims";
import StorefrontFileClaim from "@/pages/storefront/claims/file";
import StorefrontProviders from "@/pages/storefront/providers";
import StorefrontAccountInformation from "@/pages/storefront/accounts/account-info";
import StorefrontPaymentInformation from "@/pages/storefront/accounts/payment-info";
import StorefrontProfileInformation from "@/pages/storefront/accounts/profile-info";
import CreatePatient from "@/pages/healthcare/patient/create";
import PatientSignup from "@/pages/storefront/auth/signup";
import VerifyPatientOTP from "@/pages/storefront/auth/verify-otp";
import HospitalPage from "@/pages/storefront/schedule/details";
import HealthcareSignup from "@/pages/healthcare/auth/signup";
import InsuranceSignup from "@/pages/insurance/auth/signup";
import InsuranceDashboard from "@/pages/insurance/schedule";
import InsuranceLogin from "@/pages/insurance/auth/login";
import VerifyInsuranceOTP from "@/pages/insurance/auth/verify-otp";
import InsuranceProviderLayout from "@/components/features/layouts/insurance-provider";
import ClaimDetails from "@/pages/storefront/claims/view";
import HealthcareClaims from "@/pages/healthcare/claims";
import HealthcareFileClaim from "@/pages/healthcare/claims/healthcare-file-claim";
import HealthcareClaimDetails from "@/pages/healthcare/claims/view";
import InsuranceClaims from "@/pages/insurance/claims";
import InsuranceClaimDetails from "@/pages/insurance/claims/view";
import ServicePage from "@/pages/healthcare/services/service";
import HealthcarePaymentInformation from "@/pages/healthcare/accounts/payment-information";
import HealthcareProfileInformation from "@/pages/healthcare/accounts/profile-information";
import InsuranceEnrollees from "@/pages/insurance/enrollees";
import UploadBulkEnrollees from "@/pages/insurance/enrollees/create";
import InsuranceProcedures from "@/pages/insurance/procedures";
import UploadBulkProcedures from "@/pages/insurance/procedures/create";
import InsuranceDrugs from "@/pages/insurance/drugs";
import UploadBulkDrugs from "@/pages/insurance/drugs/create";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={storefrontUrl} element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<StorefrontLogin />} />
          <Route path="signup" element={<PatientSignup />} />
          <Route path="verify-otp" element={<VerifyPatientOTP />} />
        </Route>
        <Route element={<StorefrontLayout />}>
          <Route path="schedule" element={<Outlet />}>
            <Route index element={<StorefrontSchedule />} />
            <Route path=":id" element={<HospitalPage />} />
          </Route>

          <Route path="claims" element={<Outlet />}>
            <Route index element={<StorefrontClaims />} />
            <Route path="file" element={<StorefrontFileClaim />} />
            <Route path=":id" element={<ClaimDetails />} />
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
          <Route
            index
            path="*"
            element={<Navigate to={`${storefrontUrl}/auth`} />}
          />
        </Route>
      </Route>
      <Route path={healthcareUrl} element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<HospitalLogin />} />
          <Route path="verify-otp" element={<VerifyOTP />} />
          <Route path="signup" element={<HealthcareSignup />} />
        </Route>
        <Route element={<HospitalMgmtLayout />}>
          <Route path="schedule" element={<Outlet />}>
            <Route index element={<HMSchedule />} />
            <Route path=":id" element={<HMPatient />} />
            {/* <Route path="appointment/:id" element={<AppointmentDetails />} /> */}
          </Route>

          <Route path="claims" element={<Outlet />}>
            <Route index element={<HealthcareClaims />} />
            <Route path="file" element={<HealthcareFileClaim />} />
            <Route path=":id" element={<HealthcareClaimDetails />} />
          </Route>

          <Route path="nurse" element={<Nurse />} />
          <Route path="patient-management" element={<PatientManagement />} />
          <Route path="patient-management/create" element={<CreatePatient />} />
          <Route path="patient-management/:id" element={<HMPatient />} />
          <Route path="services/:id" element={<ServicePage />} />

          <Route path="accounts" element={<Outlet />}>
            <Route path="info" element={<StorefrontAccountInformation />} />
            <Route path="payment" element={<HealthcarePaymentInformation />} />
            <Route path="profile" element={<HealthcareProfileInformation />} />
            <Route
              path="*"
              element={<Navigate to={`${storefrontUrl}/accounts/profile`} />}
            />
          </Route>
        </Route>
        <Route
          index
          path="*"
          element={<Navigate to={`${healthcareUrl}/auth`} />}
        />
      </Route>
      <Route path={insuranceUrl} element={<Outlet />}>
        <Route path="auth" element={<Outlet />}>
          <Route index element={<InsuranceLogin />} />
          <Route path="verify-otp" element={<VerifyInsuranceOTP />} />
          <Route path="signup" element={<InsuranceSignup />} />
        </Route>
        <Route element={<InsuranceProviderLayout />}>
          <Route path="home" element={<Outlet />}>
            <Route index element={<InsuranceDashboard />} />
          </Route>
          <Route path="claims" element={<Outlet />}>
            <Route index element={<InsuranceClaims />} />
            <Route path=":id" element={<InsuranceClaimDetails />} />
          </Route>
          <Route path="enrollees" element={<Outlet />}>
            <Route index element={<InsuranceEnrollees />} />
            <Route path="create" element={<UploadBulkEnrollees />} />
          </Route>
          <Route path="procedures" element={<Outlet />}>
            <Route index element={<InsuranceProcedures />} />
            <Route path="create" element={<UploadBulkProcedures />} />
          </Route>
          <Route path="drugs" element={<Outlet />}>
            <Route index element={<InsuranceDrugs />} />
            <Route path="create" element={<UploadBulkDrugs />} />
          </Route>
        </Route>
        <Route
          index
          path="*"
          element={<Navigate to={`${healthcareUrl}/auth`} />}
        />
      </Route>
      <Route path="*" element={<Navigate to={`${storefrontUrl}/auth`} />} />
    </Routes>
  );
};

export default AppRouter;
