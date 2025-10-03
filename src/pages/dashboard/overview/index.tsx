import PharmacyDrugCard from "@/components/features/cards/pharmacy-drug";
import HospitalCard from "@/components/features/cards/hospital";
import InsuranceCard from "@/components/features/cards/insurance";
import InsurancePlanCard from "@/components/features/cards/insurance-plan";
import ProfileInfo from "@/components/features/profile/profile-info";
import type { IHealthcare } from "@/types/healthcare";

const DashboardOverview = () => {
  return (
    <div>
      <h1>Dashboard Overview</h1>
      <ProfileInfo
        name="Yetunde Abokoku"
        subName="AXA Mansard"
        badge="Deluxe Pro II"
      />
      <HospitalCard healthcare={{} as IHealthcare} />
      <InsuranceCard />
      <PharmacyDrugCard />
      <InsurancePlanCard />
    </div>
  );
};

export default DashboardOverview;
