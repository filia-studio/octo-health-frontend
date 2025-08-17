import PharmacyDrugCard from "@/components/features/cards/pharmacy-drug";
import HospitalCard from "@/components/features/cards/hospital";
import InsuranceCard from "@/components/features/cards/insurance";
import InsurancePlanCard from "@/components/features/cards/insurance-plan";
import ProfileInfo from "@/components/features/profile/profile-info";

const DashboardOverview = () => {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <ProfileInfo />
      <HospitalCard />
      <InsuranceCard />
      <PharmacyDrugCard />
      <InsurancePlanCard />
    </div>
  );
};

export default DashboardOverview;
