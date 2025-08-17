import React from "react";
import ProfileInfo from "../profile/profile-info";

const ProfileCard: React.FC = () => {
  return (
    <div className="flex items-center p-[24px] justify-center w-full border-[#C4C4C4] border-[0.5px] rounded-[21px] bg-white min-h-[172px]">
      <ProfileInfo toggleSidebar={() => {}} />
    </div>
  );
};

export default ProfileCard;
