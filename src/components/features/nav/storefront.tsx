import Notifications from "../notifications";
import ProfileInfo from "../profile/profile-info";
import SearchProvider from "../search/provider";

const StorefrontNav = () => {
  return (
    <div className="py-9 flex justify-between items-center">
      <ProfileInfo />
      <SearchProvider />
      <Notifications />
    </div>
  );
};

export default StorefrontNav;
