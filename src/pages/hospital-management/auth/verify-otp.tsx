import AuthLayout from "@/components/features/auth/layout";
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
      placeholder="Enter OTP"
      logo="/assets/svgs/arrow-eye-octo.svg"
      btnText="Verify OTP"
      showResendOtp={true}
      onSubmit={onSubmit}
      defaultValues={{ otp: "" }}
      registerKey="otp"
    />
  );
};

export default VerifyOTP;
