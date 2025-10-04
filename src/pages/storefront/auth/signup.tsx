import AuthLayout from "@/components/features/auth/layout";
import PatientRegistrationForm from "@/components/features/forms/patient-registration-form";
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
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="hidden md:flex md:w-fit">
        <AuthLayout>
          <div className="flex flex-col gap-6 items-center justify-between w-full relative mx-auto xl:flex-row">
            <img
              src="/assets/svgs/arrow-eye-octo.svg"
              alt=""
              className="w-[15.2rem] lg:w-[22rem]"
            />
          </div>
        </AuthLayout>
      </div>
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="h-10 bg-primary"></div>
        <div className="max-w-x mx-auto w-full">
          <PatientRegistrationForm isAuth={true} loading={isPending} handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default PatientSignup;
