import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const InsurancePlanCard = ({
  plan = "premium",
}: {
  plan?: "premium" | "intermediate" | "basic";
}) => {
  return (
    <Card className="py-0 gap-0 lg:max-w-[17rem] h-[20.25rem] overflow-hidden">
      <div className="relative">
        <img
          src={`/assets/images/insurance-plan-${plan}.png`}
          alt=""
          className="w-full h-[9.5625rem] object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute top-4 left-4 text-[0.625rem] text-primary"
        >
          Popular
        </Badge>
      </div>
      <div className="pt-2 px-4 pb-6">
        <Badge variant="outline" className="text-[0.5rem] mb-2">
          Premium
        </Badge>
        <h3 className="font-semibold line-clamp-1">Rivermind Lux</h3>
        <h5 className="text-2xl font-medium leading-[60%]">N500000</h5>
        <small className="text-[0.5rem] text-primary">Coverage per annum</small>
        <div className="flex gap-1.5 mt-5">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-9 h-9"
          >
            <img
              src="/assets/svgs/image-text.svg"
              alt=""
              className="w-5 h-2.5"
            />
          </Button>
          <Button size="icon" className="rounded-full w-9 h-9">
            <MdOutlineAddShoppingCart className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InsurancePlanCard;
