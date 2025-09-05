import AuthLayout from "@/components/features/auth/layout";
import { useSend } from "@/hooks/use-send";
import { hospitalUrl } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { mutate } = useSend<{ email: string }, { message: string }>(
    "healthcare/login/",
    {
      useAuth: false,
      onSuccess: (data, variables) => {
        navigate(`${hospitalUrl}/auth/login`);
      },
    }
  );

  const onSubmit = (data: { email: string }) => {
    mutate(data);
  };
  return (
    <AuthLayout
      bgImage="/assets/images/hospital-bg.png"
      placeholder="hi@octohealth.pro"
      logo="/assets/svgs/arrow-eye-octo.svg"
      onSubmit={onSubmit}
      defaultValues={{ email: "" }}
    />
  );
};

export default HospitalLogin;
