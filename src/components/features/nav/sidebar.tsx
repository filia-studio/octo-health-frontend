import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  hospitalSidebarRoutes,
  healthcareUrl,
  insuranceSidebarRoutes,
  storefrontSidebarRoutes,
} from "@/routes/paths";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { DashboardModule, type Route } from "@/types/common";
import { useStore } from "@/store";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Sidebar = ({
  isOpen,
  toggle,
  logo = (
    <img src="/assets/images/octo-health.png" alt="" className="w-[9.875rem]" />
  ),
  module = DashboardModule.Storefront,
}: {
  isOpen?: boolean;
  toggle: () => void;
  logo?: React.ReactNode;
  module?: string;
}) => {
  const [subRoute, setSubRoute] = useState("");
  const {
    resetHealthcareAuth,
    healthcareAuth,
    resetInsuranceAuth,
    resetPatientAuth,
  } = useStore();

  const healthcareServices = healthcareAuth?.details?.healthcare_services?.map(
    (service) => ({
      label: service,
      path: `/${service}`,
    })
  );

  const modifiedHospitalRoutes: Route[] = [...hospitalSidebarRoutes];

  const modifiedInsuranceRoutes: Route[] = [...insuranceSidebarRoutes];

  if (healthcareServices?.length) {
    modifiedHospitalRoutes.push({
      label: "Healthcare Services",
      path: `${healthcareUrl}/services${healthcareServices[0].path}`,
      subRoutes: healthcareServices,
    });
  }

  const routes: Record<string, Route[]> = {
    [DashboardModule.Storefront]: storefrontSidebarRoutes,
    [DashboardModule.Hospital]: modifiedHospitalRoutes,
    [DashboardModule.Insurance]: modifiedInsuranceRoutes,
  };

  const paths = routes[module];

  const subPaths =
    paths?.find((path) => path.label === subRoute)?.subRoutes ?? [];

  const handleLogout = () => {
    resetHealthcareAuth();
    resetInsuranceAuth();
    resetPatientAuth();
  };

  return (
    <section
      className={cn(
        "z-50 bg-white md:w-[30%] lg:w-[20%] w-full border-r border-[#E1E1E1] h-full sidebar overflow-x-auto",
        { "absolute -left-full": isOpen, "absolute lg:static": !isOpen }
      )}
    >
      <div className="h-[10.8rem] flex items-center justify-center border-b border-[#E1E1E1]">
        {logo}
      </div>
      <div className="py-4 px-5">
        <p
          onClick={() => setSubRoute("")}
          className="text-[0.625rem] text-primary font-bold tracking-[19%] cursor-pointer"
        >
          MENU{" "}
          {subRoute ? (
            <>
              <FaArrowRight className="inline text-black size-2 mx-2" />{" "}
              {subRoute}
            </>
          ) : null}
        </p>
        <div className="w-full mt-8 relative">
          <div
            className={cn("w-[200%] flex transition-all duration-300", {
              "translate-x-0": !subRoute,
              "-translate-x-1/2": subRoute,
            })}
          >
            <div className="flex flex-col gap-10 w-full">
              {paths.map(({ label, path, subRoutes }) => (
                <NavLink
                  to={path}
                  onClick={() =>
                    subRoutes?.length ? setSubRoute(label) : setSubRoute("")
                  }
                >
                  {label}
                </NavLink>
              ))}
              <span className="cursor-pointer" onClick={handleLogout}>
                Logout
              </span>
            </div>
            <div className="flex flex-col gap-10 w-full">
              {subPaths.map(({ label, path }) => (
                <NavLink to={path}>{label}</NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        size="icon"
        className="rounded-full size-7 bg-black absolute top-2.5 right-2.5 lg:hidden"
        onClick={toggle}
      >
        <BsArrowsAngleExpand className="size-3" />
      </Button>
    </section>
  );
};

export default Sidebar;
