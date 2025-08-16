import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BsArrowsAngleExpand } from "react-icons/bs";

const ProfileInfo = () => {
  return (
    <div className="flex gap-3">
      <Avatar className="size-[5.7rem] border border-primary">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="w-[calc(100%-5.7rem)]">
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
          <Button size="icon" className="rounded-full size-7 bg-black">
            <BsArrowsAngleExpand className="size-3" />
          </Button>
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
