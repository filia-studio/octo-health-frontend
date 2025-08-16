import { Outlet } from "react-router-dom";
import StorefrontNav from "../nav/storefront";
import Sidebar from "../nav/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

const StorefrontLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <main className="flex h-dvh overflow-hidden">
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
      <section
        className={cn("w-full h-full px-4 md:px-9 max-w-[75.5rem] mx-auto overflow-auto", {
          "w-full": isOpen,
          "lg:w-[80%]": !isOpen,
        })}
      >
        <StorefrontNav toggleSidebar={toggleSidebar} />
        <section>
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default StorefrontLayout;
