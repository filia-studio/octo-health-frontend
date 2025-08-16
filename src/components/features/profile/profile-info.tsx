import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { BsArrowsAngleExpand } from "react-icons/bs";

const ProfileInfo = ({
  toggleSidebar,
  resizeOnMobile,
}: {
  toggleSidebar?: () => void;
  resizeOnMobile?: boolean;
}) => {
  return (
    <div className="flex gap-3">
      <div className="w-fit relative">
        <Avatar className="size-[3.125rem] lg:size-[5.7rem] border border-primary">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {toggleSidebar && (
          <Button
            size="icon"
            className="rounded-full size-5 bg-black absolute -top-1.5 right-0 lg:hidden"
            onClick={toggleSidebar}
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
        <h5 className="text-2xl font-bold">Yetunde Abokoku</h5>
        <p>
          AXA Mansard
          <Badge
            variant="secondary"
            className="text-primary text-[0.625rem] ml-1"
          >
            Deluxe Pro II
          </Badge>
        </p>
        <div className="mt-1.5 flex gap-7 items-center">
          {toggleSidebar && (
            <Button
              size="icon"
              className="rounded-full size-7 bg-black"
              onClick={toggleSidebar}
            >
              <BsArrowsAngleExpand className="size-3" />
            </Button>
          )}
          <div className="w-full max-w-[8rem]">
            <Progress value={40} className="h-[1px]" />
            <div className="flex justify-between">
              <p className="font-semibold text-[0.44rem] text-primary">400k</p>
              <p className="font-semibold text-[0.44rem]">2M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
