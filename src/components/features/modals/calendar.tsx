import { Dialog, DialogContent } from "@/components/ui/dialog";
import Calendar from "../calendar";
import type { HealthcareFacility, IHealthcare } from "@/types/healthcare";
import type { IPatient } from "@/types/patient";

interface CalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPatient?: boolean;
  healthcare: HealthcareFacility | IHealthcare;
  patient: IPatient;
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
