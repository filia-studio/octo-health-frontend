import AddIcon from "@/components/icons/AddIcon";
import IconButton from "@/components/ui/IconButton";
import Notifications from "../../notifications";
import ProfileInfo from "../../profile/profile-info";
import { useStore } from "@/store";
import { getInitials } from "@/lib/utils";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { auth } = useStore();

  return (
    <header className="lg:min-h-[10.8rem] flex flex-col justify-center items-center bg-white border-b border-gray-200 px-4 lg:px-16 py-4 sticky top-0 z-10">
      <div className="max-w-[75.5rem] w-full mx-auto flex items-center justify-between">
        <ProfileInfo
          name={auth?.details?.name || ""}
          subName={"N/A"}
          profileImage={
            auth?.details?.photo_1 ??
            auth?.details?.photo_2 ??
            auth?.details?.photo_3
          }
          fallback={getInitials(auth?.details?.name || "")}
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
