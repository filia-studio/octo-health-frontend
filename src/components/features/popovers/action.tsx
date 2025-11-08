import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { type ReactNode } from "react";
import { FaDotCircle } from "react-icons/fa";

export interface ActionPopoverProps {
  open: boolean;
  toggle: () => void;
  options: Array<{
    title: string;
    icon?: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    hide?: boolean;
  }>;
}

const ActionPopover = ({ open, toggle, options }: ActionPopoverProps) => {
  return (
    <Popover open={open} onOpenChange={toggle}>
      <PopoverAnchor>
        <Button
          onClick={() => toggle()}
          type="button"
          variant="outline"
          className="flex-col rounded-full gap-0.5"
        >
          <FaDotCircle className="size-1" />
          <FaDotCircle className="size-1" />
          <FaDotCircle className="size-1" />
        </Button>
      </PopoverAnchor>
      <PopoverContent className="w-[8rem] p-0">
        {options
          .filter((option) => !option.hide)
          .map((option) => (
            <Button
              key={option.title}
              type="button"
              variant="outline"
              className="border-none w-full rounded-none"
              onClick={option.onClick}
              disabled={option.disabled}
              isLoading={option.isLoading}
            >
              {option.icon} {option.title}
            </Button>
          ))}
      </PopoverContent>
    </Popover>
  );
};

export default ActionPopover;
