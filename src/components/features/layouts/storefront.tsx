import { Outlet } from "react-router-dom";
import StorefrontNav from "../nav/storefront";
import Sidebar from "../nav/sidebar";

const StorefrontLayout = () => {
  return (
    <main className="flex h-dvh overflow-hidden">
      <Sidebar />
      <section className="w-[80%] h-full px-9 overflow-auto">
        <StorefrontNav />
        <section>
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default StorefrontLayout;
