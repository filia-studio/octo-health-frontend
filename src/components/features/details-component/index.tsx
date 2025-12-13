import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IHealthcare } from "@/types/healthcare";
import React, { useState } from "react";
import { CiClock2 } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import { PiCalendarPlus } from "react-icons/pi";
import CalendarModal from "../modals/calendar";
import { ImageOff } from "lucide-react";
import { useStore } from "@/store";
import type { IPatient } from "@/types/patient";

interface Props {
  hospital: IHealthcare | null;
}

const HospitalDetails: React.FC<Props> = ({ hospital }) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const patient = useStore(state => state.patient)

  const images = [
    hospital?.photo_1,
    hospital?.photo_2,
    hospital?.photo_3,
  ].filter(Boolean);

  return (
    <div className="col-span-2 bg-white rounded-lg shadow p-6 flex flex-col gap-6 w-full">
      <div className="pt-2.5 px-4 pb-8 flex items-center justify-between">
        <div className="">
          <div className="flex items-center">
            <Badge variant="outline" className="text-[10px]">
              <CiClock2 className="w-2 h-2" />
              Open 24hrs
            </Badge>
          </div>

          <h3 className="font-bold text-[24px] line-clamp-2">
            {hospital?.name}
            <MdVerified
              fill="#C80740"
              className="w-3 h-3 inline relative -top-1.5"
            />
          </h3>

          <p className="text-dusty-gray text-[15px] line-clamp-2 max-w-[295px]">
            {hospital?.address}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
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

            <Button
              onClick={() => setOpenCalendar(true)}
              size="icon"
              className="rounded-full w-9 h-9"
            >
              <PiCalendarPlus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {images.length > 0 ? (
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <img
              src={images[0]}
              alt="Hospital main"
              className="w-52 h-36 object-cover rounded-lg"
            />
            {/* +5 overlay */}
            {images.length > 2 && (
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                +{images.length - 2}
              </div>
            )}
          </div>
          {images[1] && (
            <div className="relative">
              <img
                src={images[1]}
                alt="Hospital video"
                className="w-52 h-36 object-cover rounded-lg"
              />
              {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                <PlayCircle className="text-white w-10 h-10" />
              </div> */}
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-36 bg-gray-100 rounded-lg border border-dashed border-gray-300">
          <div className="flex flex-col items-center text-gray-500">
            <ImageOff className="w-8 h-8 mb-1" />
            <span className="text-sm font-medium">No Image Available</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
        <div>
          <h3 className="text-[#7A7A7A] text-sm">Contact</h3>
          <p className="text-sm">{hospital?.contact_number}</p>
          <p className="text-sm">{hospital?.email}</p>
          <p className="text-sm">{hospital?.website}</p>
        </div>

        {hospital && hospital?.healthcare_services?.length > 0 && (
          <div>
            <h3 className="text-[#7A7A7A] text-sm">Services Offered</h3>
            <ul className="text-sm text-gray-700">
              {hospital?.healthcare_services.map((s, i) => (
                <li key={i}>{s.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <CalendarModal
        open={openCalendar}
        onOpenChange={setOpenCalendar}
        isPatient
        healthcare={hospital as IHealthcare}
        patient={patient as IPatient}
      />
    </div>
  );
};

export default HospitalDetails;
