import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaHospital, FaUserAlt } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";

interface RoleSelectionCardProps {
  role: "patient" | "healthcare" | "insurance";
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const roleIcons = {
  patient: FaUserAlt,
  healthcare: FaHospital,
  insurance: RiHealthBookFill,
};

const RoleSelectionCard = ({
  role,
  title,
  description,
  onClick,
  className,
}: RoleSelectionCardProps) => {
  const Icon = roleIcons[role];

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-2 border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-xl",
        "w-full max-w-[20rem] h-[18rem] lg:h-[22rem] flex flex-col items-center justify-center gap-6 p-6 lg:p-8",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-4 lg:gap-6">
        <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300">
          <Icon className="w-10 h-10 lg:w-14 lg:h-14 text-primary" />
        </div>

        <div className="text-center">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-sm lg:text-base text-gray-600">{description}</p>
        </div>
      </div>

      <Button
        className="w-full max-w-[12rem] rounded-[12.5rem] bg-black hover:bg-primary transition-all duration-300 h-12 lg:h-14 text-base lg:text-lg font-semibold"
      >
        Continue
      </Button>
    </Card>
  );
};

export default RoleSelectionCard;
