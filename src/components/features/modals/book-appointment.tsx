import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import PillDropdown from "../pills/dropdown";
import { Button } from "@/components/ui/button";
import type { HealthcareFacility, IHealthcare } from "@/types/healthcare";
import { useReducerState } from "@/hooks/use-reducer-state";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import Select from "react-select";

// const appointments = [
//   "Consultation",
//   "Lab Consultation",
//   "Follow-up Visit",
//   "Routine Check-up / Preventive Visit",
//   "Emergency Visit",
//   "Procedure Visit",
//   "Vaccination / Immunization Visit",
//   "Specialist Consultation",
//   "Post-operative Visit",
//   "Therapy / Rehabilitation Visit",
//   "Pharmacy / Medication Refill Visit",
//   "Telemedicine / Virtual Consultation",
//   "Home Visit / Domiciliary Care",
//   "Health Education / Counseling Session",
// ];

const appointments = ["Physical", "Virtual", "Follow_up", "Emergency"];

type State = {
  type_of_visit: string;
  time: string;
  healthcare_service: { id: string; name: string }[];
};

type FormState = {
  type_of_visit: string;
  time: string;
  healthcare_service: { value: string; label: string }[];
};

interface BookAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  time?: string;
  healthcare?: HealthcareFacility | IHealthcare;
  loading: boolean;
  onSchedule?: ({ type_of_visit, time }: State) => void;
}

const BookAppointmentModal = ({
  open,
  onOpenChange,
  date,
  time,
  healthcare,
  onSchedule,
  loading,
}: BookAppointmentModalProps) => {
  const [state, setState] = useReducerState<FormState>({
    type_of_visit: "",
    time: time ?? "",
    healthcare_service: [],
  });

  const hours = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const period = i < 12 ? "AM" : "PM";
        const hour = i % 12 === 0 ? 12 : i % 12;
        return {
          label: `${hour}:00 ${period}`,
          value: `${hour}:00 ${period}`,
          // value: `${String(i).padStart(2, "0")}:00`,
        };
      }),
    [],
  );

  useEffect(() => {
    setState({ time });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[34.8em] rounded-3xl gap-0">
        <DialogHeader className="gap-0 text-left">
          <h4 className="text-2xl font-semibold text-primary mb-2">
            {dayjs(date).format("MMMM D, YYYY")}
          </h4>
          <p className="text-lg">{healthcare?.name}</p>
          <p className="text-gray-400 text-lg">{healthcare?.address}</p>
        </DialogHeader>
        <section>
          <div className="flex gap-6 flex-wrap sm:flex-nowrap mt-10 mb-5">
            <PillDropdown
              className="w-full md:w-1/2 !h-12 border-black rounded-[2.5rem] px-5"
              placeholder="Type of visit"
              options={appointments.map((x) => ({
                label: x.replace("_", "-"),
                value: x.toUpperCase(),
              }))}
              value={state.type_of_visit}
              onValueChange={(value) => setState({ type_of_visit: value })}
            />
            <PillDropdown
              className="w-full md:w-1/2 !h-12 border-black rounded-[2.5rem] px-5"
              placeholder="Time slot"
              options={hours}
              value={state.time}
              onValueChange={(value) => setState({ time: value })}
            />
          </div>
          <div className="mb-5">
            <Select
              isMulti
              placeholder="Healthcare services (optional)"
              value={state.healthcare_service}
              onChange={(value) =>
                setState({
                  healthcare_service: value as FormState["healthcare_service"],
                })
              }
              // options={healthcare?.?.map((x) => ({
              //   label: x.name,
              //   value: x.id,
              // }))}
              classNames={{
                control: (state) =>
                  `border !border-black !rounded-full !min-h-12 px-5 !shadow-none ${
                    state.isFocused
                      ? "!border-ring ring-ring/50 ring-[3px]"
                      : ""
                  }`,
              }}
            />
          </div>
          <p className="text-gray-500 mb-6">
            Please note that all bookings are subject to confirmation by your
            provider and rescheduling after confirmation attracts fees.
          </p>
          <Button
            size="lg"
            className="rounded-[3.125rem] w-full max-w-[7.7rem]"
            onClick={() =>
              onSchedule?.({
                ...state,
                healthcare_service: state.healthcare_service.map((x) => ({
                  id: x.value,
                  name: x.label,
                })),
              })
            }
            isLoading={loading}
          >
            Book
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
