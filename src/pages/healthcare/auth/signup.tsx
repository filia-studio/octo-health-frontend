import HealthcareRegistrationForm from '@/components/features/forms/healthcare-registration-form'
import RegisterLayout from '@/components/features/layouts/register'

const HealthcareSignup = () => {
  return (
    <RegisterLayout bgImage="/assets/images/hospital-bg.png">
      <HealthcareRegistrationForm />
    </RegisterLayout>
  )
}

export default HealthcareSignup
