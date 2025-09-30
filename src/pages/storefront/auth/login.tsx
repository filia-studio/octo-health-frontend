import AuthLayout from "@/components/features/auth/layout";
import AuthCard from "@/components/features/cards/auth";
import { storefrontUrl } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

const StorefrontLogin = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6 items-center justify-between w-full relative max-w-[80rem] mx-auto xl:flex-row">
        <img
          src="/assets/svgs/arrow-eye-octo.svg"
          className="w-[15.2rem] lg:w-[22rem]"
        />
        <AuthCard
          onSubmit={() => navigate(`${storefrontUrl}/schedule`)}
          defaultValues={{}}
        />
      </div>
    </AuthLayout>
  );
};

export default StorefrontLogin;
