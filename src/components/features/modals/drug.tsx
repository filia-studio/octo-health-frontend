import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const DrugModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [tab, setTab] = useState("description");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[29.25rem] rounded-3xl gap-0">
        <DialogHeader>
          <DialogTitle className="text-2xl">Coartem </DialogTitle>
          <DialogDescription className="text-black">
            Artemether/Lumefantrine
          </DialogDescription>
          <Badge variant="outline">
            <span className="text-xs">200mg</span>
            <IoIosArrowRoundDown className="size-1.5" />
          </Badge>
        </DialogHeader>
        <div className="mt-7">
          <div className="flex gap-8">
            <Button
              type="button"
              variant="link"
              className={cn("w-fit h-fit p-0 text-gray-400", {
                "text-black": tab === "description",
              })}
              onClick={() => setTab("description")}
            >
              Description
            </Button>
            <Button
              type="button"
              variant="link"
              className={cn("w-fit h-fit p-0 text-gray-400", {
                "text-black": tab === "dosage",
              })}
              onClick={() => setTab("dosage")}
            >
              Dosage
            </Button>
          </div>
          <div className="my-7">
            {tab === "description" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
                <div className="flex flex-col gap-9">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-gray-400">
                      Manufacturer
                    </p>
                    <p className="text-sm font-medium">Medplus</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-gray-400">
                      Coverage
                    </p>
                    <p className="text-sm font-medium text-primary">Insured</p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-gray-400">
                      Ingredients
                    </p>
                    <p className="text-sm font-medium">Artemether 20 mg</p>
                    <p className="text-sm font-medium">Lumefantrine 12 mg</p>
                    <p className="text-sm font-medium">Paracetamol 500 mg</p>
                  </div>
                </div>
              </div>
            )}
            {tab === "dosage" && (
              <div>
                <div className="mb-5">
                  <p>Adults : 💊💊💊💊 x 2 (daily) x 3 days</p>
                  <p>Children: 💊💊💊💊 x 2 (daily) x 3 days</p>
                </div>
                <div>
                  <p className="font-medium text-gray-400 mb-1.5">
                    ⚠️ Warnings
                  </p>
                  <p className="font-medium">
                    Not recommended for severe malaria. Use caution in patients
                    with heart conditions or taking drugs that prolong QT
                    interval. Avoid with strong CYP3A4 inducers (e.g., rifampin)
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mb-10">
            <Button size="icon" className="rounded-full size-9">
              <MdOutlineAddShoppingCart className="size-4" />
            </Button>
            <Badge variant="outline" className="border-blue-400 text-blue-400">
              <img src="/assets/svgs/pills.svg" alt="" className="size-2.5" />
              <span className="text-xs">Dosage Guide</span>
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DrugModal;
