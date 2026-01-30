import HealthcareRegistrationForm from "@/components/features/forms/healthcare-registration-form"
import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail"

const HealthcareProfileInformation = () => {
  return (
    <DashboardDetailLayout title="Profile Information">
      <HealthcareRegistrationForm isEdit />
    </DashboardDetailLayout>
  )
}

export default HealthcareProfileInformation