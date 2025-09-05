import { Button } from "@/components/ui/button";
import { clearLS, cn } from "@/lib/utils";
import { hospitalSidebarRoutes, storefrontSidebarRoutes } from "@/routes/paths";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { DashboardModule } from "@/types/common";
import { useStore } from "@/store";

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
  const { resetAuth, auth } = useStore();

  const healthcareServices = auth?.details?.healthcare_services?.map(
    (service) => ({
      label: service,
      path: "",
    })
  );

  const modifiedHospitalRoutes = [
    ...hospitalSidebarRoutes,
    ...(healthcareServices || []),
  ];

  const routes: Record<
    string,
    typeof storefrontSidebarRoutes | typeof hospitalSidebarRoutes
  > = {
    [DashboardModule.Storefront]: storefrontSidebarRoutes,
    [DashboardModule.Hospital]: modifiedHospitalRoutes,
  };

  const handleLogout = () => {
    resetAuth();
  };

  return (
    <section
      className={cn(
        "z-50 bg-white md:w-[30%] lg:w-[20%] w-full border-r border-[#E1E1E1] h-full sidebar",
        { "absolute -left-full": isOpen, "absolute lg:static": !isOpen }
      )}
    >
      <div className="h-[10.8rem] flex items-center justify-center border-b border-[#E1E1E1]">
        {logo}
      </div>
      <div className="py-4 px-5">
        <p className="text-[0.625rem] text-primary font-bold tracking-[19%]">
          MENU
        </p>
        <div className="flex flex-col gap-10 mt-8">
          {routes[module].map(({ label, path }) => (
            <NavLink to={path}>{label}</NavLink>
          ))}
          <span className="cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
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
