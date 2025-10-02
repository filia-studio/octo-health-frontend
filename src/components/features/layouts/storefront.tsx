import { Outlet } from "react-router-dom";
import StorefrontNav from "../nav/storefront/storefront";
import Sidebar from "../nav/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CartPopover from "../popovers/cart";

const StorefrontLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <main className="flex h-dvh overflow-hidden">
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />
      <section
        className={cn(
          "w-full h-full px-4 md:px-9 max-w-[75.5rem] mx-auto overflow-auto",
          {
            "w-full": isOpen,
            "lg:w-[80%]": !isOpen,
          }
        )}
      >
        <StorefrontNav toggleSidebar={toggleSidebar} />
        <section className="w-full pb-6">
          <Outlet />
        </section>
        <CartPopover wrapperClassName="fixed bottom-8 right-8 z-50 shadow-2xl" />
      </section>
    </main>
  );
};

export default StorefrontLayout;
