import AuthLayout from "@/components/features/auth/layout";
import AuthCard from "@/components/features/cards/auth";
import { useSend } from "@/hooks/use-send";
import { hospitalUrl } from "@/routes/paths";
import { useStore } from "@/store";
import type { OtpVerificationResponse } from "@/types/otp";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { setAuth } = useStore();
  const { mutate } = useSend<{ otp: string }, OtpVerificationResponse>(
    "healthcare/verify_otp/",
    {
      useAuth: false,
      onSuccess: (data) => {
        navigate(`${hospitalUrl}/schedule`);
        setAuth({ token: data?.data?.access, details: data?.data?.healthcare });
      },
    }
  );

  const onSubmit = (data: { otp: string }) => {
    mutate(data);
  };
  return (
    <AuthLayout
      bgImage="/assets/images/hospital-bg.png"
      // dashboardUrl={`${hospitalUrl}/schedule`}
    >
      <div className="flex flex-col gap-6 items-center justify-between w-full relative max-w-[80rem] mx-auto xl:flex-row">
        <img
          src="/assets/svgs/arrow-eye-octo.svg"
          alt=""
          className="w-[15.2rem] lg:w-[22rem]"
        />
        <AuthCard
          placeholder="Enter OTP"
          btnText="Verify OTP"
          showResendOtp={true}
          onSubmit={(data: any) => onSubmit(data)}
          defaultValues={{ otp: "" }}
          registerKey="otp"
        />
      </div>
    </AuthLayout>
  );
};

export default VerifyOTP;
