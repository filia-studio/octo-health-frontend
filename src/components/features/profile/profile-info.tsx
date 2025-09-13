import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BsArrowsAngleExpand } from "react-icons/bs";

const ProfileInfo = ({
  onExpand,
  resizeOnMobile,
  onClick,
  name,
  subName,
  badge,
  profileImage,
  showProgress = true,
  className,
}: {
  onExpand?: () => void;
  resizeOnMobile?: boolean;
  onClick?: () => void;
  name: string;
  subName?: string;
  profileImage?: string;
  showProgress?: boolean;
  badge?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex gap-3",
        {
          "lg:w-fit": resizeOnMobile,
          "w-full": !resizeOnMobile,
        },
        className
      )}
    >
      <div className="w-fit relative">
        <Avatar
          onClick={onClick}
          className="size-[3.125rem] lg:size-[5.7rem] border border-primary"
        >
          <AvatarImage src={profileImage ?? "https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {onExpand && (
          <Button
            size="icon"
            className="rounded-full size-5 bg-black absolute -top-1.5 right-0 lg:hidden"
            onClick={onExpand}
          >
            <BsArrowsAngleExpand className="size-2" />
          </Button>
        )}
      </div>
      <div
        className={cn("w-[calc(100%-5.7rem)]", {
          "hidden lg:block": resizeOnMobile,
        })}
      >
        <h5 className="text-2xl font-bold whitespace-nowrap w-full truncate">
          {name}
        </h5>
        <p>
          {subName}
          {badge && (
            <Badge
              variant="secondary"
              className="text-primary text-[0.625rem] ml-1"
            >
              {badge}
            </Badge>
          )}
        </p>
        {onExpand || showProgress ? (
          <div
            className={cn("mt-1.5 flex gap-7 items-center", {
              "mt-4": !onExpand,
            })}
          >
            {onExpand && (
              <Button
                size="icon"
                className="rounded-full size-7 bg-black hidden lg:inline-flex"
                onClick={onExpand}
              >
                <BsArrowsAngleExpand className="size-3" />
              </Button>
            )}
            {showProgress && (
              <div className="w-full max-w-[8rem]">
                <Progress value={40} className="h-[1px]" />
                <div className="flex justify-between">
                  <p className="font-semibold text-[0.44rem] text-primary">
                    400k
                  </p>
                  <p className="font-semibold text-[0.44rem]">2M</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
