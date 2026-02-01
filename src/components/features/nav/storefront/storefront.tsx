import Notifications from "../../notifications";
import ProfileInfo from "../../profile/profile-info";
import ProfileModal from "../../modals/profile";
import SearchProvider from "../../search/provider";
import { useState } from "react";
import { useStore } from "@/store";
import { getInitials } from "@/lib/utils";

const StorefrontNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [showProfile, setShowProfile] = useState(false);
  const {
    patientAuth: { details: patient },
  } = useStore();

  const fullName = `${patient?.user?.last_name || ""} ${
    patient?.user?.first_name || ""
  }`;

  return (
    <div className="md:py-9 py-4 gap-2 flex justify-between items-center">
      <ProfileInfo
        resizeOnMobile
        profileImage={patient?.user?.photo_url ?? ""}
        name={fullName}
        subName="Patient"
        showProgress={false}
        onExpand={toggleSidebar}
        onClick={() => setShowProfile(true)}
        fallback={getInitials(fullName)}
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
