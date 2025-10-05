import InsuranceRegistrationForm from "@/components/features/forms/insurance-registration-form";
import RegisterLayout from "@/components/features/layouts/register";

const InsuranceSignup = () => {
  return (
    <RegisterLayout bgImage="/assets/images/hospital-bg.png">
      <InsuranceRegistrationForm />
    </RegisterLayout>
  );
};

export default InsuranceSignup;
