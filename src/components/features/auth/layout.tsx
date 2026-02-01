import { cn } from "@/lib/utils";

const AuthLayout = ({
  bgImage = "/assets/images/family.png",
  children,
  className,
}: {
  bgImage?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn(
        "h-dvh px-2 lg:pl-[8.3125rem] lg:pr-24 overflow-hidden flex flex-col items-center justify-center relative before:absolute before:inset-0 before:bg-black/30 before:z-0",
        className,
      )}
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
