import AuthLayout from "@/components/features/auth/layout";
import AuthCard from "@/components/features/cards/auth";
import { useSend } from "@/hooks/use-send";
import { storefrontUrl } from "@/routes/paths";
import { useStore } from "@/store";
import type { PatientOtpVerificationResponse } from "@/types/otp";
import { useNavigate } from "react-router-dom";

const VerifyPatientOTP = () => {
  const navigate = useNavigate();
  const { setAuth, setPatient } = useStore();
  const { mutate, isPending } = useSend<
    { otp: string },
    PatientOtpVerificationResponse
  >("patient/verify_otp/", {
    useAuth: false,
    hideToast: "success",
    onSuccess: (data) => {
      navigate(`${storefrontUrl}/schedule`);
      setAuth({ token: data?.data?.access });
      setPatient(data?.data?.patient);
    },
  });

  const onSubmit = (data: { otp: string }) => {
    mutate(data);
  };
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6 items-center justify-between w-full relative max-w-[80rem] mx-auto xl:flex-row">
        <img
          src="/assets/svgs/arrow-eye-octo.svg"
          alt=""
          className="w-[15.2rem] lg:w-[22rem]"
        />
        <AuthCard
          type="patient"
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

export default VerifyPatientOTP;
