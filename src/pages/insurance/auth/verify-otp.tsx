import AuthLayout from "@/components/features/auth/layout";
import AuthCard from "@/components/features/cards/auth";
import { useSend } from "@/hooks/use-send";
import { insuranceUrl } from "@/routes/paths";
import { useStore } from "@/store";
import type { VerifyOtpResponse } from "@/types/insurance";
import { useNavigate } from "react-router-dom";

const VerifyInsuranceOTP = () => {
  const navigate = useNavigate();
  const { setInsuranceAuth } = useStore();
  const { mutate, isPending } = useSend<{ otp: string }, VerifyOtpResponse>(
    "insurance_provider/verify_otp/",
    {
      useAuth: false,
      onSuccess: (data) => {
        navigate(`${insuranceUrl}/schedule`);
        setInsuranceAuth({
          token: data?.data?.access,
          details: data?.data?.data,
        });
      },
    }
  );

  const onSubmit = (data: { otp: string }) => {
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
          placeholder="Enter OTP"
          btnText="Verify OTP"
          showResendOtp={true}
          onSubmit={(data) => onSubmit(data as { otp: string })}
          defaultValues={{ otp: "" }}
          registerKey="otp"
          loading={isPending}
        />
      </div>
    </AuthLayout>
  );
};

export default VerifyInsuranceOTP;
