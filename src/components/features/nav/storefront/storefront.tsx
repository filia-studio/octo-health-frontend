import Notifications from "../../notifications";
import ProfileInfo from "../../profile/profile-info";
import ProfileModal from "../../modals/profile";
import SearchProvider from "../../search/provider";
import { useState } from "react";
import { useStore } from "@/store";

const StorefrontNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { patient } = useStore();

  return (
    <div className="md:py-9 py-4 gap-2 flex justify-between items-center">
      <ProfileInfo
        resizeOnMobile
        name={`${patient?.user?.last_name} ${patient?.user?.first_name}`}
        subName="AXA Mansard"
        badge="Deluxe Pro II"
        onExpand={toggleSidebar}
        onClick={() => setShowProfile(true)}
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
