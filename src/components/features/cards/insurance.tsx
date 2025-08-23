import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import InsurancePlans from "../modals/insurance-plans";
import { useState } from "react";

const InsuranceCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="py-0 gap-0 lg:max-w-[17rem] h-[20.25rem] overflow-hidden">
      <div className="relative">
        <img
          src="/assets/images/insurance-sample.png"
          alt=""
          className="w-full h-[9.3125rem] object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute top-4 left-4 text-[0.625rem] bg-white text-primary"
        >
          Popular
        </Badge>
      </div>
      <div className="pt-2.5 px-4 pb-8">
        <h3 className="font-bold line-clamp-1 max-w-[13.1825rem] mb-2.5">
          Meristem Assurance
        </h3>
        <p className="text-dusty-gray text-xs">Coverage starts from</p>
        <h5 className="text-2xl font-medium leading-[80%]">N500000</h5>
        <small className="text-[0.5rem] text-primary">per annum</small>
        <div className="flex gap-1.5 mt-5">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={() => setOpen(true)}
          >
            <img src="/assets/svgs/image-compare.svg" alt="" className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-9 h-9"
          >
            <img src="/assets/svgs/image-text.svg" alt="" className="w-5 h-2.5" />
          </Button>
        </div>
      </div>
      <InsurancePlans open={open} onOpenChange={setOpen} />
    </Card>
  );
};

export default InsuranceCard;
