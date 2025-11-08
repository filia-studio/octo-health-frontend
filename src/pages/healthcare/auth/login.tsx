import AuthLayout from "@/components/features/auth/layout";
import AuthCard from "@/components/features/cards/auth";
import { useSend } from "@/hooks/use-send";
import { healthcareUrl } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSend<{ email: string }, { message: string }>(
    "healthcare/login/",
    {
      useAuth: false,
      onSuccess: (_, variables) => {
        sessionStorage.setItem("email", variables.email);
        navigate(`${healthcareUrl}/auth/verify-otp`);
      },
    }
  );

  const onSubmit = (data: { email: string }) => {
    mutate(data);
  };
  return (
    <AuthLayout bgImage="/assets/images/hospital-bg.png">
      <div className="flex flex-col gap-6 items-center justify-between w-full relative max-w-[80rem] mx-auto xl:flex-row">
        <img
          src="/assets/svgs/arrow-eye-octo.svg"
          alt=""
          className="w-[15.2rem] lg:w-[22rem]"
        />
        <AuthCard
          placeholder="hi@octohealth.pro"
          onSubmit={(data) => onSubmit(data as { email: string })}
          defaultValues={{ email: "" }}
          loading={isPending}
        />
      </div>
    </AuthLayout>
  );
};

export default HospitalLogin;
