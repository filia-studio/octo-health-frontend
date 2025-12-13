import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import ReviewModal from "../modals/review-modal";

const FeedbackPopover = ({
  appointmentId,
  healthcareId,
}: {
  appointmentId: string;
  healthcareId: string;
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs font-medium hidden md:block">Share feedback</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor>
          <Button
            type="button"
            className="bg-black rounded-full size-9"
            onClick={toggle}
          >
            <MdOutlineThumbUp className="size-4" />
          </Button>
        </PopoverAnchor>
        <PopoverContent className="w-[18rem] rounded-2xl border p-4 pb-10">
          <ReviewModal
            open={open}
            onClose={() => setOpen(false)}
            appointmentId={appointmentId}
            healthcareId={healthcareId}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FeedbackPopover;
