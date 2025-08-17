import ProfileImage from "@/assets/images/profile-image.png";
import { BellIcon } from "@/components/icons";
import AddIcon from "@/components/icons/AddIcon";
import ExpandIcon from "@/components/icons/ExpandIcon";
import IconButton from "@/components/ui/IconButton";

const Header = () => {
  return (
    <header className="h-[173px] flex items-center justify-between bg-white border-b border-gray-200 px-[64px] py-4">
      {/* <div className="flex items-center justify-between"> */}
      <div className="flex items-center gap-4">
        <div className="">
          <img src={ProfileImage} alt="" className="" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[23px] text-black">
            Femi Adejuwon
          </span>
          <span className="text-[17px] text-black">Doctor</span>
          <IconButton>
            <ExpandIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <IconButton width="36px" height="36px">
          <AddIcon />
        </IconButton>

        <BellIcon />
      </div>
    </header>
  );
};
export default Header;
