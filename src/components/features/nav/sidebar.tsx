import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <section className="w-[20%] border-r border-[#E1E1E1] h-full sidebar">
      <div className="h-[10.8rem] flex items-center justify-center border-b border-[#E1E1E1]">
        <img
          src="/assets/images/octo-health.png"
          alt=""
          className="w-[9.875rem]"
        />
      </div>
      <div className="py-4 px-5">
        <p className="text-[0.625rem] text-primary font-bold tracking-[19%]">
          MENU
        </p>
        <div className="flex flex-col gap-10 mt-8">
          <NavLink to="/storefront/schedule">Schedule</NavLink>
          <NavLink to="/storefront/insurance">Insurance</NavLink>
          <NavLink to="/storefront/pharmacy">Pharmacy</NavLink>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
