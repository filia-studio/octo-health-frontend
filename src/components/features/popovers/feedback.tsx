import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineThumbUp } from "react-icons/md";

const Rate = ({ toggle }: { toggle?: () => void }) => {
  const suggestions = [
    "Service",
    "Maintenance",
    "Hygiene",
    "Staff",
    "Facility",
    "Price",
  ];

  return (
    <section>
      <div className="flex justify-end">
        <Button
          size="icon"
          variant="link"
          className="text-gray-400"
          onClick={toggle}
        >
          <AiOutlineClose className="size-4" />
        </Button>
      </div>
      <div>
        <h5 className="text-center uppercase text-[0.625rem] font-bold">
          Rate your experience
        </h5>
        <div className="flex mx-auto justify-center gap-2 my-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Button
              key={index}
              type="button"
              size="icon"
              variant="outline"
              className="rounded-full size-9 text-sm text-black border-black"
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <div className="my-3 flex flex-wrap gap-x-1 gap-y-1.5">
          {suggestions.map((s) => (
            <Button
              key={s}
              type="button"
              variant="secondary"
              className="bg-gray-100 rounded-2xl border border-black text-black text-[0.625rem] py-1.5 h-6"
            >
              {s}
            </Button>
          ))}
        </div>
        <Input placeholder="add personal note" className="rounded-3xl text-[0.625rem] text-center" />
        <Button className="rounded-3xl text-[0.625rem] bg-black w-full mt-2.5">Submit</Button>
      </div>
    </section>
  );
};

const FeedbackPopover = () => {
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
          <Rate toggle={toggle} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FeedbackPopover;
