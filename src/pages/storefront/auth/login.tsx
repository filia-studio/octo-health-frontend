import AuthLayout from "@/components/features/auth/layout";
import { storefrontUrl } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

const StorefrontLogin = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout
      onSubmit={() => navigate(`${storefrontUrl}/schedule`)}
      defaultValues={{}}
    />
  );
};

export default StorefrontLogin;
