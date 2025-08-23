import AddIcon from "@/components/icons/AddIcon";
import IconButton from "@/components/ui/IconButton";
import Notifications from "../../notifications";
import ProfileInfo from "../../profile/profile-info";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="min-h-[10.8rem] flex flex-col justify-center items-center bg-white border-b border-gray-200 px-4 lg:px-16 py-4 sticky top-0 z-10">
      <div className="max-w-[75.5rem] w-full mx-auto flex items-center justify-between">
        <ProfileInfo
          name="Femi Adejuwon"
          subName="Doctor"
          profileImage="/assets/images/profile-image.png"
          showProgress={false}
          onExpand={toggleSidebar}
        />
        <div className="flex items-center gap-3">
          <IconButton width="36px" height="36px">
            <AddIcon />
          </IconButton>

          <Notifications />
        </div>
      </div>
    </header>
  );
};
export default Header;
