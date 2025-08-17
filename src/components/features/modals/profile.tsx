import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProfileInfo from "../profile/profile-info";
import { Button } from "@/components/ui/button";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProfileDataProps = { title: string; value: ReactNode; value2?: ReactNode };

const ProfileData = ({ data }: { data: ProfileDataProps[] }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-9 my-7">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col gap-1.5">
          <p className="text-sm font-medium text-gray-400">{item.title}</p>
          <p className="text-sm font-medium">{item.value}</p>
          {item.value2 && <p className="text-sm font-medium">{item.value2}</p>}
        </div>
      ))}
    </section>
  );
};

const ProfileModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [tab, setTab] = useState("overview");

  const overviewData: ProfileDataProps[] = [
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

  const insuranceData: ProfileDataProps[] = [
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
              {tab === "overview" && <ProfileData data={overviewData} />}
              {tab === "insurance" && (
                <>
                  <ProfileData data={insuranceData} />
                  <Button type="button" className="rounded-[3.125rem] mb-7">Upgrade</Button>
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
