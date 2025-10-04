import PatientRegistrationForm from "@/components/features/forms/patient-registration-form";
import RegisterLayout from "@/components/features/layouts/register";
import { useSend } from "@/hooks/use-send";
import { storefrontUrl } from "@/routes/paths";
import React from "react";
import { useNavigate } from "react-router-dom";

const PatientSignup: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSend<unknown, { message: string }>(
    "patient/",
    {
      useAuth: false,
      onSuccess: () => navigate(`${storefrontUrl}/schedule`),
      errorMessage: "An error occurred!",
      successMessage: "Patient record created successfully",
    }
  );

  const handleSubmit = (data: unknown) => {
    mutate(data);
  };

  return (
    <RegisterLayout>
      <PatientRegistrationForm
        isAuth
        loading={isPending}
        handleSubmit={handleSubmit}
      />
    </RegisterLayout>
  );
};

export default PatientSignup;
