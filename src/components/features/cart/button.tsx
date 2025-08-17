import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "./item";

const CartList = ({ toggle }: { toggle?: () => void }) => {
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
      <div className="flex flex-col gap-2.5 max-h-[13rem] overflow-y-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <CartItem isInsured={index % 2 === 0} key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4 mb-6">
        <div className="flex justify-between items-center">
          <p className="text-xs">Total</p>
          <p className="text-xs font-semibold">N60000</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs">Taxes (7.5%)</p>
          <p className="text-xs font-semibold">N60000</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs">Delivery Fee</p>
          <p className="text-xs font-semibold">N60000</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs">Service Charge </p>
          <p className="text-xs font-semibold">N60000</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs">Grand Total</p>
          <p className="text-xs font-semibold">N60000</p>
        </div>
      </div>
      <div className="flex flex-col gap-1 5">
        <Button type="button" className="rounded-4xl">
          Pay now
        </Button>
        <Button type="button" className="rounded-4xl bg-gray-400 hover:bg-gray-300">
          Change address
        </Button>
        <Button type="button" className="rounded-4xl bg-black hover:bg-gray-700">
          View wallet
        </Button>
      </div>
    </section>
  );
};

const CartButton = ({
  className,
  wrapperClassName,
}: {
  className?: string;
  wrapperClassName?: string;
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className={cn("w-fit", wrapperClassName)}>
      <div className="w-fit relative">
        <Popover open={open}>
          <PopoverAnchor>
            <Button
              type="button"
              className={cn("bg-black rounded-full size-14", className)}
              onClick={toggle}
            >
              <MdOutlineShoppingCart className="size-6" />
            </Button>
          </PopoverAnchor>
          <PopoverContent className="max-[22.5rem]:max-w-[20rem] w-[22rem] rounded-2xl border border-black p-4 pb-10">
            <CartList toggle={toggle} />
          </PopoverContent>
        </Popover>
        <Badge className="absolute -top-1/8 -right-1/5">100</Badge>
      </div>
    </div>
  );
};

export default CartButton;
