import DashboardOverview from "@/pages/dashboard/overview";
import Schedule from "@/pages/schedule";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  );
};

export default AppRouter;
