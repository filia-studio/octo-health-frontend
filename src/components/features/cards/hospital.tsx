import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PiCalendarPlus } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import CalendarModal from "../modals/calendar";
import { useState } from "react";
import type { IHealthcare } from "@/types/healthcare";
import { haversineDistance } from "@/lib/utils";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

const HospitalCard = ({
  healthcare,
  showDirection = true,
  showCalendar = true,
}: {
  healthcare: IHealthcare;
  showDirection?: boolean;
  showCalendar?: boolean;
}) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const navigate = useNavigate();
  const { patient } = useStore();

  const userLat = patient?.latitude ?? null;
  const userLon = patient?.longitude ?? null;

  const hospitalLat = healthcare?.latitude ?? null;
  const hospitalLon = healthcare?.longitude ?? null;

  let distance: number | null = null;

  if (
    userLat != null &&
    userLon != null &&
    hospitalLat != null &&
    hospitalLon != null
  ) {
    distance = haversineDistance(
      Number(userLat),
      Number(userLon),
      Number(hospitalLat),
      Number(hospitalLon)
    );
  }

  return (
    <Card className="py-0 gap-0 lg:max-w-[17rem] h-[22.625rem] overflow-hidden">
      <div className="relative">
        <img
          src={healthcare?.logo || "/assets/images/hospital-sample.png"}
          alt={healthcare?.name}
          className="w-full h-[9.3125rem] object-cover"
        />
        <Badge
          variant="default"
          className="absolute top-4 left-4 text-[0.625rem]"
        >
          {healthcare?.healthcare_type}
        </Badge>
      </div>

      <div className="pt-2.5 px-4 pb-8">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[0.5rem]">
            <CiClock2 className="w-2 h-2" />
            Open 24hrs
          </Badge>

          <small className="text-[0.5rem]">
            {distance && distance > 0
              ? `${distance?.toFixed(1)} km away`
              : "Nearby"}
          </small>
        </div>

        <h3
          onClick={() => navigate(healthcare?.id)}
          className="font-semibold line-clamp-2 max-w-[13.1825rem] my-2"
        >
          {healthcare?.name}
          <MdVerified
            fill="#C80740"
            className="w-3 h-3 inline relative -top-1.5"
          />
        </h3>

        <p className="text-dusty-gray line-clamp-2">{healthcare?.address}</p>

        <div className="flex items-center justify-between mt-11">
          <div className="flex gap-1.5">
            {showDirection && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-9 h-9"
              >
                <img
                  src="/assets/svgs/direction.svg"
                  alt="Directions"
                  className="w-3 h-3"
                />
              </Button>
            )}
            {showCalendar && (
              <Button
                onClick={() => setOpenCalendar(true)}
                size="icon"
                className="rounded-full w-9 h-9"
              >
                <PiCalendarPlus className="w-3 h-3" />
              </Button>
            )}
          </div>

          <p className="text-dusty-gray">
            <span className="text-primary">4.5</span> / 5.0
          </p>
        </div>
      </div>

      <CalendarModal
        open={openCalendar}
        onOpenChange={setOpenCalendar}
        isPatient
      />
    </Card>
  );
};

export default HospitalCard;
