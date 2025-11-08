import { Dialog, DialogContent } from "@/components/ui/dialog";
import Calendar from "../calendar";
import type { IHealthcare } from "@/types/healthcare";
import type { Patient } from "@/types/otp";

interface CalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPatient?: boolean;
  healthcare: IHealthcare;
  patient: Patient;
}

const CalendarModal = ({
  open,
  onOpenChange,
  isPatient,
  healthcare,
  patient,
}: CalendarModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[49.5rem] rounded-3xl gap-0">
        <Calendar
          isPatient={isPatient}
          healthcare={healthcare}
          patient={patient}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
