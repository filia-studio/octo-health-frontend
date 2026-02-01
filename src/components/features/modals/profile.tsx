import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProfileInfo from "../profile/profile-info";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn, getInitials } from "@/lib/utils";
import GridData, { type GridDataProps } from "../common/grid-data";
import dayjs from "dayjs";
import type { IPatient } from "@/types/patient";

const ProfileModal = ({
  open,
  onOpenChange,
  patient,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: IPatient | null;
}) => {
  const [tab, setTab] = useState("overview");

  const user = patient?.user;
  const dateJoined = user?.date_joined || patient?.created_at;
  const ageInYears = dayjs().diff(dayjs(user?.date_of_birth), "years");
  const ageInMonths = dayjs().diff(dayjs(user?.date_of_birth), "months");
  const patientInsurance = patient?.insurance_details ?? [];
  const fullName = `${user?.last_name} ${user?.first_name}`;

  const overviewData: GridDataProps[] = [
    {
      title: "Email",
      value: user?.email || "",
    },
    {
      title: "Gender",
      value: user?.gender || "",
    },
    {
      title: "Member since",
      value: dayjs(dateJoined?.split("T")[0]).format("DD MMMM YYYY") || "",
    },
    {
      title: "Phone",
      value: user?.contact_number || "",
    },
    {
      title: "Age",
      value:
        ageInYears < 1
          ? `${ageInMonths} month${ageInMonths > 1 ? "s" : ""} old`
          : `${ageInYears} year${ageInYears > 1 ? "s" : ""} old`,
    },
    {
      title: "Recent consultancy",
      value: "Evercare Hospital",
      value2: "9:00pm, 30 July 2025",
    },
  ];

  const insuranceData: GridDataProps[][] = patientInsurance.map((insurance) => [
    {
      title: "Provider",
      value: insurance.name,
    },
    {
      title: "Code",
      value: insurance.hmo_id,
    },
    {
      title: "Type",
      value: insurance.insurance_type,
    },
    {
      title: "Plan Tier",
      value: insurance.insurance_plan,
    },
  ]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="max-h-[35rem] md:max-h-full">
          <ProfileInfo
            name={fullName}
            profileImage={user?.photo_url ?? ""}
            subName="Patient"
            badge=""
            showProgress={false}
            fallback={getInitials(fullName)}
          />
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
              {tab === "insurance" &&
                insuranceData.map((i, index) => (
                  <GridData
                    className={cn("my-7", {
                      "border-b pb-3": index !== insuranceData.length - 1,
                    })}
                    data={i}
                    key={index}
                  />
                ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
