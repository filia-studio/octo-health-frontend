import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import DrugModal from "../modals/drug";
import { useReducerState } from "@/hooks/use-reducer-state";

const PharmacyDrugCard = () => {
  const [state, setState] = useReducerState({ openDetails: false });

  return (
    <Card className="py-0 gap-0 lg:max-w-[17rem] h-[22.625rem] overflow-hidden">
      <div className="relative">
        <img
          src="/assets/images/drug-sample.png"
          alt=""
          className="w-full h-[9.3125rem] object-cover"
        />
        <Badge
          variant="secondary"
          className="absolute top-4 left-4 text-[0.625rem] bg-blue-600 text-white"
        >
          Best Price
        </Badge>
      </div>
      <div className="pt-2.5 px-4 pb-8">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[0.5rem]">
            <CiClock2 className="w-2 h-2" />
            Open 24hrs
          </Badge>
          <small className="text-[0.5rem]">Delivers in 2hrs</small>
        </div>
        <p className="font-semibold mt-2 mb-3 line-clamp-1">
          Medplus{" "}
          <MdVerified
            fill="#C80740"
            className="w-3 h-3 inline relative -top-1.5"
          />
        </p>
        <h3 className="font-semibold line-clamp-1 text-primary">
          Coartem Multi-vitamin D
        </h3>
        <h5 className="text-2xl font-medium leading-[100%]">N500000</h5>
        <div className="flex items-center justify-between mt-11">
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
            >
              <img
                src="/assets/svgs/image-compare.svg"
                alt=""
                className="w-5 h-5"
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
            >
              <img
                src="/assets/svgs/direction.svg"
                alt=""
                className="w-3 h-3"
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9"
              onClick={() => setState({ openDetails: true })}
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
          <p className="text-dusty-gray">
            <span className="text-primary">4.5</span> / 5.0
          </p>
        </div>
      </div>
      <DrugModal
        open={state.openDetails}
        onOpenChange={(value) => setState({ openDetails: value })}
      />
    </Card>
  );
};

export default PharmacyDrugCard;
