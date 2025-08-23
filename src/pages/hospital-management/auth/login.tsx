import AuthLayout from "@/components/features/auth/layout";
import { hospitalUrl } from "@/routes/paths";

const HospitalLogin = () => {
  return (
    <AuthLayout
      bgImage="/assets/images/hospital-bg.png"
      dashboardUrl={`${hospitalUrl}/schedule`}
      placeholder="hi@octohealth.pro"
      logo="/assets/svgs/arrow-eye-octo.svg"
    />
  );
};

export default HospitalLogin;
