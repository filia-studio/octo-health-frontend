import AuthLayout from "@/components/features/auth/layout";
import PatientRegistrationForm from "@/components/features/forms/patient-registration-form";
import React from "react";

const PatientSignup = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="hidden md:flex md:w-1/2 ">
        <AuthLayout bgImage="/assets/images/hospital-bg.png">
          <div className="flex flex-col gap-6 items-center justify-between w-full relative max-w-[80rem] mx-auto xl:flex-row">
            <img
              src="/assets/svgs/arrow-eye-octo.svg"
              alt=""
              className="w-[15.2rem] lg:w-[22rem]"
            />
          </div>
        </AuthLayout>
      </div>
      <div className="md:w-1/2 flex-1 h-screen overflow-y-auto">
        <div className="max-w-xl w-full">
          <PatientRegistrationForm isAuth={true} />
        </div>
      </div>
    </div>
  );
};

export default PatientSignup;
