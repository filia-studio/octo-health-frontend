import Notifications from "../notifications";
import ProfileInfo from "../profile/profile-info";
import ProfileModal from "../modals/profile";
import SearchProvider from "../search/provider";
import { useState } from "react";

const StorefrontNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="md:py-9 py-4 gap-2 flex justify-between items-center">
      <ProfileInfo
        resizeOnMobile
        toggleSidebar={toggleSidebar}
        onClick={() => setShowProfile(true)}
      />
      <SearchProvider />
      <Notifications />
      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
    </div>
  );
};

export default StorefrontNav;
