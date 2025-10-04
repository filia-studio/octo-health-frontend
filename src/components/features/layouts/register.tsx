import type { ReactNode } from "react";
import AuthLayout from "../auth/layout";

const RegisterLayout = ({
  bgImage,
  children,
}: {
  bgImage?: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="hidden md:block md:w-fit">
        <AuthLayout bgImage={bgImage}>
          <div className="flex flex-col gap-6 items-center justify-between w-full relative mx-auto xl:flex-row">
            <img
              src="/assets/svgs/arrow-eye-octo.svg"
              alt=""
              className="w-[15.2rem] lg:w-[22rem]"
            />
          </div>
        </AuthLayout>
      </div>
      <div className="flex-1 h-screen overflow-y-auto">
        <div className="h-20 md:h-10 bg-primary flex justify-center items-center">
          <img
            src="/assets/svgs/arrow-eye-octo.svg"
            alt=""
            className="w-20 md:hidden"
          />
        </div>
        <div className="max-w-x mx-auto w-full">{children}</div>
      </div>
    </div>
  );
};

export default RegisterLayout;
