import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProfileInfo from "../profile/profile-info";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import GridData, { type GridDataProps } from "../common/grid-data";

const ProfileModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [tab, setTab] = useState("overview");

  const overviewData: GridDataProps[] = [
    {
      title: "Email",
      value: "yetundeabokoku@gmail.com",
    },
    {
      title: "Gender",
      value: "Male",
    },
    {
      title: "Member since",
      value: "02 July 2025",
    },
    {
      title: "Phone",
      value: "+234 812 345 6789",
    },
    {
      title: "Age",
      value: "60 Years Old",
    },
    {
      title: "Recent consultancy",
      value: "Evercare Hospital",
      value2: "9:00pm, 30 July 2025",
    },
  ];

  const insuranceData: GridDataProps[] = [
    {
      title: "Provider",
      value: "AXA Mansard",
    },
    {
      title: "Code",
      value: "90430439",
    },
    {
      title: "Support",
      value: "help@axa.com",
    },
    {
      title: "Plan Status",
      value: (
        <span>
          400K / <span className="text-primary">N2M</span>
        </span>
      ),
    },
    {
      title: "Plan Tier",
      value: "Deluxe Pro II",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="max-h-[35rem] md:max-h-full overflow-y-auto">
          <ProfileInfo />
          <div className="mt-7">
            <div className="flex gap-8">
              <Button
                type="button"
                variant="link"
                className={cn("w-fit h-fit p-0 text-gray-400", {
                  "text-black": tab === "overview",
                })}
                onClick={() => setTab("overview")}
              >
                Overview
              </Button>
              <Button
                type="button"
                variant="link"
                className={cn("w-fit h-fit p-0 text-gray-400", {
                  "text-black": tab === "insurance",
                })}
                onClick={() => setTab("insurance")}
              >
                Insurance
              </Button>
            </div>
            <div>
              {tab === "overview" && (
                <GridData className="my-7" data={overviewData} />
              )}
              {tab === "insurance" && (
                <>
                  <GridData className="my-7" data={insuranceData} />
                  <Button type="button" className="rounded-[3.125rem] mb-7">
                    Upgrade
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
