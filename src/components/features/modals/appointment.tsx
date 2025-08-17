import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { GridDataProps } from "../common/grid-data";
import GridData, { GridDataItem } from "../common/grid-data";
import FeedbackPopover from "../popovers/feedback";
import { FaRegFileAlt } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Prescription = ({
  className,
  isLab,
}: {
  className?: string;
  isLab?: boolean;
}) => {
  const details: GridDataProps[] = [
    {
      title: "Provider",
      value: "Evercare Pharmacy",
    },
    {
      title: "Dispensed by",
      value: "Victor Ikpeba",
    },
    ...(isLab
      ? [
          {
            title: "Fulfilled on",
            value: "26 Jan 2028, 09:00",
          },
        ]
      : []),
    {
      title: "Total cost",
      value: <span className="text-primary">200000.86</span>,
    },
    {
      title: "Payment method",
      value: <span className="text-primary">Paystack + Insurance</span>,
    },
  ];

  return (
    <section className={cn("grid grid-cols-1 sm:grid-cols-2 gap-9", className)}>
      <div className="flex flex-col gap-4">
        {details.map((i) => (
          <GridDataItem key={i.title} {...i} />
        ))}
      </div>
      {isLab ? (
        <div>
          <p className="text-sm font-medium text-gray-400">Test/s</p>
          <div className="overflow-hidden w-52 h-[20.625rem] relative">
            <img
              src="/assets/images/graded-out.png"
              alt=""
              className="size-full object-cover"
            />
            <div className="absolute top-1/2 -translate-1/2 left-1/2 w-full">
              <Input
                placeholder="Enter OTP"
                className="bg-white max-w-[10.5rem] mx-auto text-center border-black rounded-4xl"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-gray-400">Items</p>
            <p className="text-sm font-medium">
              Artemether 20 mg <span className="text-gray-300">x 2</span>
            </p>
            <p className="text-sm font-medium">
              Lumefantrine 12 mg <span className="text-gray-300">x 2</span>
            </p>
            <p className="text-sm font-medium">
              Paracetamol 500 mg <span className="text-gray-300">x 2</span>
            </p>
          </div>

          <Badge
            variant="outline"
            className="border-blue-400 text-blue-400 mt-10"
          >
            <img src="/assets/svgs/pills.svg" alt="" className="size-2.5" />
            <span className="text-xs">Dosage Guide</span>
          </Badge>
        </div>
      )}
    </section>
  );
};

const AppointmentModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [tab, setTab] = useState("summary");

  const summaryData: GridDataProps[] = [
    {
      title: "Patient",
      value: "Alima Dansabo (F)",
      value2: "Lagos, Nigeria",
    },
    {
      title: "Contact",
      value: "alimashineshine@gmail.com",
      value2: "+234 080 4567 4536",
    },
    {
      title: "Consultant",
      value: "Dr Tobechukwu Anyanwu",
    },
    {
      title: "Purpose",
      value: "Follow up",
    },
    {
      title: "Provider",
      value: "AXA Mansard",
    },
    {
      title: "Plan",
      value: <span className="text-primary">Deluxe Pro II</span>,
    },
    {
      title: "Next appointment",
      value: "Not set, pending lab",
    },
    {
      title: "Total cost",
      value: <span className="text-primary">N400000.86</span>,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[29.25rem] rounded-3xl gap-0">
        <DialogHeader className="gap-0 text-left">
          <h4 className="text-2xl font-semibold text-primary mb-2">
            12 Aug 2028
          </h4>
          <p>Evercare Hospital</p>
          <p className="text-gray-400">10:00am - 02:00pm</p>
        </DialogHeader>
        <div className="mt-7">
          <div className="flex gap-8">
            <Button
              type="button"
              variant="link"
              className={cn("w-fit h-fit p-0 text-gray-400", {
                "text-black": tab === "summary",
              })}
              onClick={() => setTab("summary")}
            >
              Summary
            </Button>
            <Button
              type="button"
              variant="link"
              className={cn("w-fit h-fit p-0 text-gray-400", {
                "text-black": tab === "prescription",
              })}
              onClick={() => setTab("prescription")}
            >
              Prescription
            </Button>
            <Button
              type="button"
              variant="link"
              className={cn("w-fit h-fit p-0 text-gray-400", {
                "text-black": tab === "lab",
              })}
              onClick={() => setTab("lab")}
            >
              Lab
            </Button>
          </div>
          <div>
            {tab === "summary" && (
              <GridData className="my-7" data={summaryData} />
            )}
            {tab === "prescription" && <Prescription className="my-7" />}
            {tab === "lab" && <Prescription className="my-7" isLab />}
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-3.5">
            <Button className="rounded-[3.125rem]">Pay now</Button>
            <Button size="icon" className="rounded-full size-9">
              <FaRegFileAlt className="size-4" />
            </Button>
            <Button size="icon" className="rounded-full size-9">
              <MdOutlineAddShoppingCart className="size-4" />
            </Button>
          </div>
          <FeedbackPopover />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
