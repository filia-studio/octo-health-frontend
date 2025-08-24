import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";

const CartItem = ({ isInsured }: { isInsured?: boolean }) => {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-[#B6B6B6]">
      <div className="size-11 overflow-hidden border rounded-xl border-primary">
        <img
          src="/assets/images/drug-sample.png"
          alt=""
          className="size-full object-cover"
        />
      </div>
      <div className="w-[calc(100%-2.75rem)] flex gap-2 justify-between">
        <div className="flex flex-col">
          {isInsured && (
            <Badge
              variant="secondary"
              className="text-[0.3125rem] text-primary"
            >
              Insured
            </Badge>
          )}
          <p className="font-semibold text-xs">Coartem 200mg</p>
          <p className="text-xs">N200000</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button size="icon" variant="outline" className="size-6 text-black rounded-md">
            <FaPlus className="size-2" />
          </Button>
          <p className="text-[0.5rem] font-semibold">2</p>
          <div className="flex gap-1">
            <Button size="icon" variant="outline" className="size-6 text-black rounded-md">
              <FaMinus className="size-2" />
            </Button>
            <Button size="icon" variant="outline" className="size-6 text-black rounded-md">
              <FaRegTrashAlt className="size-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
