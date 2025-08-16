import Notifications from "../notifications";
import ProfileInfo from "../profile/profile-info";
import SearchProvider from "../search/provider";

const StorefrontNav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className="md:py-9 py-4 gap-2 flex justify-between items-center">
      <ProfileInfo resizeOnMobile toggleSidebar={toggleSidebar} />
      <SearchProvider />
      <Notifications />
    </div>
  );
};

export default StorefrontNav;
