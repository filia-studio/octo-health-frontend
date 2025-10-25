import Notifications from "../../notifications";
import ProfileInfo from "../../profile/profile-info";
import ProfileModal from "../../modals/profile";
import SearchProvider from "../../search/provider";
import { useState } from "react";
import { useStore } from "@/store";
import type { InsuranceProviderListResponse } from "@/types/insurance";
import { useFetch } from "@/hooks/use-fetch";
import { getInitials } from "@/lib/utils";

const StorefrontNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { patient } = useStore();

  const { data: insuranceProviders } = useFetch<
    InsuranceProviderListResponse[]
  >("insurance_provider/", {
    useAuth: false,
    errorMessage: "Failed to load insurance providers",
  });

  const insuranceInfo =
    patient?.insurance_details?.map((detail) => {
      const provider = insuranceProviders?.find(
        (p) => p.insurance.id === detail.id
      );
      return {
        name: provider?.insurance?.name ?? "Unknown Provider",
        plan: detail.insurance_plan ?? "No Plan",
      };
    }) ?? [];

  const subName = insuranceInfo.map((i) => i.name).join(", ");
  const badge = insuranceInfo.map((i) => i.plan).join(", ");

  return (
    <div className="md:py-9 py-4 gap-2 flex justify-between items-center">
      <ProfileInfo
        resizeOnMobile
        name={`${patient?.user?.last_name || ""} ${
          patient?.user?.first_name || ""
        }`}
        subName={subName ?? ""}
        badge={badge ?? ""}
        onExpand={toggleSidebar}
        onClick={() => setShowProfile(true)}
        fallback={getInitials(patient?.user?.last_name || "")}
      />
      <SearchProvider />
      <Notifications />
      <ProfileModal
        open={showProfile}
        onOpenChange={setShowProfile}
        patient={patient}
      />
    </div>
  );
};

export default StorefrontNav;
