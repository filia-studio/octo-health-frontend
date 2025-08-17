import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import GridData, {
  GridDataItem,
  type GridDataProps,
} from "../common/grid-data";
import { Badge } from "@/components/ui/badge";
import { FaRegHospital } from "react-icons/fa";

const InsurancePlan = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [tab, setTab] = useState("description");

  const descriptionData: GridDataProps[] = [
    {
      title: "Provider",
      value: "Meristem Assurance Ltd",
    },
    {
      title: "Coverage Type",
      value: "Health, Life, Accident",
    },
    {
      title: "Head Office",
      value: "V20a Gerrard Road, Ikoyi, Lagos 106104, Lagos",
    },
    {
      title: "Waiting Period",
      value: "30 days for general cover, 12 months for maternity",
    },
    {
      title: "Subscription",
      value: <span className="text-primary">N20000 per month</span>,
    },
    {
      title: "Co-pay / Deductible",
      value: "10% co-pay on all prescriptions",
    },
    {
      title: "Coverage Limit",
      value: <span className="text-primary">N500000 per year</span>,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[29.25rem] rounded-3xl gap-0">
        <DialogHeader className="gap-0 text-left">
          <h4 className="text-2xl font-semibold text-primary mb-2">
            Rivermind Lux
          </h4>
          <p>Meristem Assurance</p>
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
                "text-black": tab === "benefits",
              })}
              onClick={() => setTab("benefits")}
            >
              Benefits
            </Button>
          </div>
          <div>
            {tab === "description" && (
              <GridData className="mt-7" data={descriptionData} />
            )}
            {tab === "benefits" && (
              <div className="flex flex-col gap-5 mt-7">
                <GridDataItem
                  title="Provider"
                  value="Outpatient care, Inpatient care, Maternity, Dental, Optical"
                />
                <GridDataItem
                  title="Exclusions"
                  value="Cosmetic procedures, pre-existing conditions (within 12 months)"
                />
              </div>
            )}
          </div>
          <div className="mt-20 flex items-center justify-between">
            <Button className="rounded-[3.125rem]">Subscribe</Button>
            <Badge variant="outline" className="text-primary border-primary">
              <FaRegHospital className="size-2.5" />
              <span className="text-[0.625rem]">Network</span>
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InsurancePlan;
