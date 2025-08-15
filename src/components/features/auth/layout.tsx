import AuthCard from "../cards/auth";

const AuthLayout = ({
  bgImage = "/assets/images/family.png",
}: {
  bgImage?: string;
}) => {
  return (
    <main
      className="h-dvh overflow-hidden flex flex-col items-center justify-center relative before:absolute before:inset-0 before:bg-black/30 before:z-0"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-between pl-[8.3125rem] pr-24 w-full relative">
        <img
          src="/assets/images/octo-health-white.png"
          alt=""
          className="w-[22rem]"
        />
        <AuthCard />
      </div>
    </main>
  );
};

export default AuthLayout;
