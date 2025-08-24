import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { IoIosArrowRoundDown } from "react-icons/io";

const PillDropdown = ({
  placeholder,
  options,
  className,
  onValueChange,
  value,
}: {
  className?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  value?: string;
}) => {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger
        className={cn("py-0.5 px-1.5 font-medium !h-fit rounded-2xl text-xs", className)}
        icon={<IoIosArrowRoundDown />}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PillDropdown;
