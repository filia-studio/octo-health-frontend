import PatientRegistrationForm from "@/components/features/forms/patient-registration-form";
import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import { useSend } from "@/hooks/use-send";
import { hospitalUrl } from "@/routes/paths";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreatePatient: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = useSend<any, { message: string }>("patient/", {
    useAuth: false,
    onSuccess: () => navigate(`${hospitalUrl}/patient-management`),
    errorMessage: "An error occurred!",
    successMessage: "Patient record created successfully",
  });

  const handleSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <DashboardDetailLayout title="Create Patient">
      <PatientRegistrationForm handleSubmit={handleSubmit} />
    </DashboardDetailLayout>
  );
};

export default CreatePatient;
