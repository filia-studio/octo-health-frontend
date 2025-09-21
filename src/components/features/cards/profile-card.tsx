import React, { useState } from "react";
import ProfileInfo from "../profile/profile-info";
import ProfileModal from "../modals/profile";

interface ProfileCardProps {
  patientName: string;
  insuranceProvider?: string;
  insurancePlan?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  patientName,
  insuranceProvider,
  insurancePlan,
}) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex items-center p-[24px] justify-center w-full border-[#C4C4C4] border-[0.5px] rounded-[21px] bg-white min-h-[172px]">
      <ProfileInfo
        name={patientName || ""}
        subName={insuranceProvider || ""}
        badge={insurancePlan || ""}
        onExpand={() => setShowProfile(true)}
      />
      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
    </div>
  );
};

export default ProfileCard;
