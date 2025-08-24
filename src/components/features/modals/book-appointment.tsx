import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import PillDropdown from "../pills/dropdown";
import { Button } from "@/components/ui/button";

interface BookAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookAppointmentModal = ({
  open,
  onOpenChange,
}: BookAppointmentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[34.8em] rounded-3xl gap-0">
        <DialogHeader className="gap-0 text-left">
          <h4 className="text-2xl font-semibold text-primary mb-2">
            12 Aug 2028
          </h4>
          <p className="text-lg">Evercare Hospital</p>
          <p className="text-gray-400 text-lg">Plot 245, Wuse 2, Garki, Abuja</p>
        </DialogHeader>
        <section>
          <div className="flex gap-16 flex-wrap sm:flex-nowrap mt-10 mb-5">
            <PillDropdown
              className="w-full md:w-1/2 !h-12 border-black rounded-[2.5rem] px-5"
              placeholder="Type of visit"
              options={[
                {
                  label: "Consultation",
                  value: "Consultation",
                },
                {
                  label: "Lab Consultation",
                  value: "Lab Consultation",
                },
              ]}
              onValueChange={() => {}}
            />
            <PillDropdown
              className="w-full md:w-1/2 !h-12 border-black rounded-[2.5rem] px-5"
              placeholder="Time slot"
              options={[
                {
                  label: "10 AM",
                  value: "10 AM",
                },
              ]}
              onValueChange={() => {}}
            />
          </div>
          <p className="text-gray-500 mb-6">
            Please note that all bookings are subject to confirmation by your
            provider and rescheduling after confirmation attracts fees.
          </p>
          <Button size="lg" className="rounded-[3.125rem] w-full max-w-[7.7rem]">Book</Button>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
