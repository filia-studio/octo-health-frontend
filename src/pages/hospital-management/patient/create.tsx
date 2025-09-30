import PatientRegistrationForm from "@/components/features/forms/patient-registration-form";
import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import React from "react";

const CreatePatient: React.FC = () => {
  return (
    <DashboardDetailLayout title="Create Patient">
      <PatientRegistrationForm />
    </DashboardDetailLayout>
  );
};

export default CreatePatient;
