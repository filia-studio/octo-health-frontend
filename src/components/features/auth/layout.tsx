const AuthLayout = ({
  // placeholder,
  bgImage = "/assets/images/family.png",
  children,
}: // logo = "/assets/images/octo-health-white.png",
// btnText,
// showResendOtp,
// onSubmit,
// defaultValues,
// registerKey,
{
  bgImage?: string;
  dashboardUrl?: string;
  placeholder?: string;
  // logo?: string;
  // btnText?: string;
  // showResendOtp?: boolean;
  // onSubmit: SubmitHandler<any>;
  // defaultValues?: any;
  // registerKey?: string;
  children: React.ReactNode;
}) => {
  return (
    <main
      className="h-dvh px-2 lg:pl-[8.3125rem] lg:pr-24 overflow-hidden flex flex-col items-center justify-center relative before:absolute before:inset-0 before:bg-black/30 before:z-0"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </main>
  );
};

export default AuthLayout;
