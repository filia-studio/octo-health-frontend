import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PiCalendarPlus } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { MdVerified } from "react-icons/md";

const HospitalCard = () => {
  return (
    <Card className="py-0 gap-0 lg:max-w-[17rem] h-[22.625rem] overflow-hidden">
      <div className="relative">
        <img
          src="/assets/images/hospital-sample.png"
          alt=""
          className="w-full h-[9.3125rem] object-cover"
        />
        <Badge
          variant="default"
          className="absolute top-4 left-4 text-[0.625rem]"
        >
          Primary
        </Badge>
      </div>
      <div className="pt-2.5 px-4 pb-8">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[0.5rem]">
            <CiClock2 className="w-2 h-2" />
            Open 24hrs
          </Badge>
          <small className="text-[0.5rem]">5 mins away</small>
        </div>
        <h3 className="font-semibold line-clamp-2 max-w-[13.1825rem] my-2">
          Chinook Memorial Baptist Regional Hospital <MdVerified fill="#C80740" className="w-3 h-3 inline relative -top-1.5" />
        </h3>
        <p className="text-dusty-gray">Plot 245, Wuse 2, Garki, Abuja</p>
        <div className="flex items-center justify-between mt-11">
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
            >
              <img
                src="/assets/svgs/direction.svg"
                alt=""
                className="w-3 h-3"
              />
            </Button>
            <Button size="icon" className="rounded-full w-9 h-9">
              <PiCalendarPlus className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-dusty-gray">
            <span className="text-primary">4.5</span> / 5.0
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HospitalCard;
