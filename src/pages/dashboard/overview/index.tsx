import PageLayout from "@/layout";
import RecentSection from "./recent-section";
import { recentItems } from "@/data";
import OverViewSection from "./overview-section";

const DashboardOverview = () => {
  return (
    <PageLayout>
      {/* <div className=""> */}
      <RecentSection items={recentItems} />
      <OverViewSection />
      {/* </div> */}
    </PageLayout>
  );
};

export default DashboardOverview;
