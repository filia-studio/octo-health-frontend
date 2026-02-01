import AuthLayout from "@/components/features/auth/layout";
import AuthCard from "@/components/features/cards/auth";
import { useSend } from "@/hooks/use-send";
import { storefrontUrl } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useSend<unknown, { message: string }>(
    "patient/patient_login/",
    {
      useAuth: false,
      onSuccess: (_, variables) => {
        sessionStorage.setItem(
          "patient_code",
          (variables as { patient_code: string }).patient_code
        );
        navigate(`${storefrontUrl}/auth/verify-otp`);
      },
      successMessage: "Success! OTP has been sent to your mail",
    }
  );

  const handleSubmit = (data: unknown) => {
    mutate(data);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6 items-center justify-between w-full relative max-w-[80rem] mx-auto xl:flex-row">
        <img
          src="/assets/svgs/arrow-eye-octo.svg"
          className="w-[15.2rem] lg:w-[22rem]"
        />
        <AuthCard
          type="patient"
          onSubmit={handleSubmit}
          registerKey="patient_code"
          defaultValues={{ patient_code: "" }}
          loading={isPending}
        />
      </div>
    </AuthLayout>
  );
};

export default PatientLogin;
