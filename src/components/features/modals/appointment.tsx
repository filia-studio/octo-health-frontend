import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { GridDataProps } from "../common/grid-data";
import GridData, { GridDataItem } from "../common/grid-data";
import FeedbackPopover from "../popovers/feedback";
import {
  FaMinus,
  FaPen,
  FaPlus,
  FaRegFileAlt,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PillDropdown from "../pills/dropdown";
import { RiImageAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { BsArrowsAngleExpand } from "react-icons/bs";

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

const Drug = () => {
  return (
    <div className="flex items-center gap-2 pb-3 border-b border-[#B6B6B6]">
      <div className="size-16 overflow-hidden border rounded-xl border-primary">
        <img
          src="/assets/images/drug-sample.png"
          alt=""
          className="size-full object-cover"
        />
      </div>
      <div className="w-[calc(100%-2.75rem)] flex gap-2 justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-xs mb-1">Coartem 200mg</p>
          <PillDropdown
            value="200mg"
            options={[
              { label: "200mg", value: "200mg" },
              { label: "400mg", value: "400mg" },
            ]}
            onValueChange={(value) => console.log(value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <Button
            size="icon"
            variant="outline"
            className="size-6 text-black rounded-md"
          >
            <FaPlus className="size-2" />
          </Button>
          <p className="text-[0.5rem] font-semibold">2</p>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              className="size-6 text-black rounded-md"
            >
              <FaMinus className="size-2" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-6 text-black rounded-md"
            >
              <FaRegTrashAlt className="size-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Lab = ({
  color = "#07B8C8",
  title = "X-ray",
}: {
  color?: string;
  title?: string;
}) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex items-center gap-2 pb-3 border-b border-[#B6B6B6]">
      <div
        className="size-16 overflow-hidden border rounded-xl flex justify-center items-center"
        style={{ backgroundColor: color }}
      >
        <img src="/assets/svgs/plus.svg" alt="" className="size-5" />
      </div>
      <div className="w-[calc(100%-2.75rem)] flex gap-2 justify-between">
        <div className="flex flex-col">
          <p className="font-semibold text-xs mb-1">{title}</p>
          <PillDropdown
            value="Cranium"
            options={[
              { label: "Cranium", value: "Cranium" },
              { label: "Spine", value: "Spine" },
            ]}
            onValueChange={(value) => console.log(value)}
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1.5">
            <div>
              <label htmlFor="file">
                <span className="size-8 flex justify-center items-center bg-black text-white rounded-full">
                  {file ? (
                    <BsArrowsAngleExpand className="size-2.5" />
                  ) : (
                    <RiImageAddFill className="size-3" />
                  )}
                </span>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </label>
            </div>
            <Checkbox
              checked={!!file}
              onCheckedChange={() => setFile(null)}
              className="rounded-full size-8 border-black data-[state=checked]:bg-[#07C85B] data-[state=checked]:border-none"
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="size-6 text-black rounded-md"
          >
            <FaRegTrashAlt className="size-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const HospitalPrescription = ({
  className,
  isLab,
}: {
  className?: string;
  isLab?: boolean;
}) => {
  return (
    <section className={cn("", className)}>
      <Input
        placeholder="Search"
        className="rounded-4xl border-[#7C7979] px-8"
      />
      <div className="flex flex-col gap-6 mt-7">
        {isLab ? <Lab /> : <Drug />}
        {isLab ? <Lab color="purple" title="ECG" /> : <Drug />}
        <div>
          <p>
            <strong>Status:</strong> Dispensed by{" "}
            <Link to="" className="underline">
              Kazeem Balogun
            </Link>{" "}
            on 8/10/29 at 09:00pm
          </p>
          <p>
            <strong>Payment Method:</strong> Insurance
          </p>
        </div>
      </div>
    </section>
  );
};

const AppointmentModal = ({
  open,
  onOpenChange,
  isPatientView = true,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPatientView?: boolean;
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
    ...(!isPatientView
      ? []
      : [
          {
            title: "Total cost",
            value: <span className="text-primary">N400000.86</span>,
          },
        ]),
  ];

  const vitalsData: GridDataProps[] = [
    {
      title: "Temperature",
      value: "36.5°C",
    },
    {
      title: "Blood Pressure",
      value: "120/80 mmHg",
    },
    {
      title: "Heart Rate",
      value: "72 bpm",
    },
    {
      title: "Height",
      value: "165 cm",
    },
    {
      title: "Weight",
      value: "65 kg",
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
            {!isPatientView && (
              <Button
                type="button"
                variant="link"
                className={cn("w-fit h-fit p-0 text-gray-400", {
                  "text-black": tab === "vitals",
                })}
                onClick={() => setTab("vitals")}
              >
                Vitals
              </Button>
            )}
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
            {!isPatientView && (
              <Button
                type="button"
                variant="link"
                className={cn("w-fit h-fit p-0 text-gray-400", {
                  "text-black": tab === "notes",
                })}
                onClick={() => setTab("notes")}
              >
                Notes
              </Button>
            )}
          </div>
          <div>
            {tab === "summary" && (
              <GridData className="my-7" data={summaryData} />
            )}
            {tab === "vitals" && (
              <GridData className="my-7" data={vitalsData} />
            )}
            {tab === "prescription" && isPatientView && (
              <Prescription className="my-7" />
            )}
            {tab === "lab" && isPatientView && (
              <Prescription className="my-7" isLab />
            )}
            {tab === "prescription" && !isPatientView && (
              <HospitalPrescription className="my-7" />
            )}
            {tab === "lab" && !isPatientView && (
              <HospitalPrescription isLab className="my-7" />
            )}
            {tab === "notes" && (
              <div className="my-7 flex flex-col gap-4">
                <GridDataItem
                  title="Presenting Complainant"
                  value="Patient was diagnosed with malaria (Plasmodium falciparum) on August 2, 2025, after presenting with fever, chills, and fatigue; treatment with artemether-lumefantrine was initiated, and the patient is advised to rest and refrain from regular activities until August 7, 2025"
                />
                <GridDataItem
                  title="Examination"
                  value="Well hydrated, anicteric, afebrile"
                />
              </div>
            )}
          </div>
        </div>
        <div className={cn("flex justify-between items-center", {
          "mt-6": isPatientView,
          "mt-10": !isPatientView
        })}>
          <div className="flex items-center gap-3.5">
            {isPatientView && (
              <>
                <Button className="rounded-[3.125rem]">Pay now</Button>
                <Button size="icon" className="rounded-full size-9">
                  <FaRegFileAlt className="size-4" />
                </Button>
                <Button size="icon" className="rounded-full size-9">
                  <MdOutlineAddShoppingCart className="size-4" />
                </Button>
              </>
            )}
            {!isPatientView && (
              <>
                <Button size="icon" className="rounded-full size-9">
                  <FaPen className="size-3" />
                </Button>
                <Button size="icon" className="rounded-full size-9">
                  <FaRegFileAlt className="size-4" />
                </Button>
              </>
            )}
          </div>
          {isPatientView && <FeedbackPopover />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
