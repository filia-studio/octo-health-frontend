import AuthLayout from "@/components/features/auth/layout";
import RoleSelectionCard from "@/components/features/cards/role-selection";
import { healthcareUrl, insuranceUrl, storefrontUrl } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      role: "healthcare" as const,
      title: "Healthcare Provider",
      description: "Login as a healthcare facility or professional",
      path: `${healthcareUrl}/auth`,
    },
    {
      role: "insurance" as const,
      title: "Insurance Provider",
      description: "Login as an insurance company representative",
      path: `${insuranceUrl}/auth`,
    },
    {
      role: "patient" as const,
      title: "Patient",
      description: "Access your health records and appointments",
      path: `${storefrontUrl}/auth`,
    },
  ];

  return (
    <AuthLayout
      bgImage="/assets/images/family.png"
      className="h-fit lg:h-dvh py-3"
    >
      <div className="flex flex-col items-center justify-center w-full relative max-w-[80rem] mx-auto z-10 px-4">
        {/* Logo */}
        <div className="mb-8 lg:mb-12">
          <img
            src="/assets/svgs/arrow-eye-octo.svg"
            alt="Octo Health Logo"
            className="w-[12rem] lg:w-[18rem]"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-3">
            Welcome to Octo Health
          </h1>
          <p className="text-base lg:text-xl text-white/90">
            Choose your account type to continue
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-[68rem]">
          {roles.map((roleData) => (
            <RoleSelectionCard
              key={roleData.role}
              role={roleData.role}
              title={roleData.title}
              description={roleData.description}
              onClick={() => navigate(roleData.path)}
            />
          ))}
        </div>
      </div>
    </AuthLayout>
  );
};

export default RoleSelectionPage;
