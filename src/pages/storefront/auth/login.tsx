import AuthLayout from "@/components/features/auth/layout";
import AuthCard from "@/components/features/cards/auth";
import { useSend } from "@/hooks/use-send";
import { storefrontUrl } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

const StorefrontLogin = () => {
  const navigate = useNavigate();

  const { mutate } = useSend<any, { message: string }>(
    "patient/patient_login/",
    {
      useAuth: false,
      onSuccess: () => navigate(`${storefrontUrl}/verify-otp`),
      errorMessage: "An error occurred!",
      successMessage: "Success!",
    }
  );

  const handleSubmit = (data: any) => {
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
          onSubmit={handleSubmit}
          registerKey="patient_code"
          defaultValues={{ patient_code: "" }}
        />
      </div>
    </AuthLayout>
  );
};

export default StorefrontLogin;
