import { Dialog, DialogContent } from "@/components/ui/dialog";
import Calendar from "../calendar";

interface CalendarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPatient?: boolean;
}

const CalendarModal = ({ open, onOpenChange, isPatient }: CalendarModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[49.5rem] rounded-3xl gap-0">
        <Calendar isPatient={isPatient} />
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
