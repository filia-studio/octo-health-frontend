import GridData, {
  type GridDataProps,
} from "@/components/features/common/grid-data";
import ProfileInfo from "@/components/features/profile/profile-info";
import StorefrontIcon from "@/components/icons/StorefrontIcon";
import { Button } from "@/components/ui/button";
import React from "react";

const invoiceDetails: GridDataProps[] = [
  {
    title: "Date Issued",
    value: "05 Jul 2025",
  },
  {
    title: "Invoice Number",
    value: "00000000",
  },
];

const items: GridDataProps[] = [
  { title: "Paracetamol 500 mg", value: "₦60000" },
  { title: "Amoxicillin 500 mg", value: "₦4050" },
  { title: "Ibuprofen 200 mg", value: "₦3000" },
  { title: "Metformin 500 mg", value: "₦1000" },
  { title: "Loratadine 10 mg", value: "₦68000" },
];

const totals: GridDataProps[] = [
  { title: "Total", value: "₦60000" },
  { title: "Taxes (7.5%)", value: "₦4050" },
  { title: "Delivery Fee", value: "₦3000" },
  { title: "Service Charge", value: "₦1000" },
  { title: "Grand Total", value: "₦68000" },
];

const PharmacyInvoice: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-[24px]">
        <div className="flex items-center p-[24px] justify-center w-full border-[#C4C4C4] border-[0.5px] rounded-[21px] bg-white min-h-[132px]">
          <ProfileInfo
            name="Saidat Mukhtar"
            showProgress={false}
            subName="AXA Mansard"
            badge="Deluxe Pro II"
            className="flex items-center"
          />
        </div>
        <div className="border border-[#DBD9D9] rounded-[12px] p-[24px] bg-white h-full">
          <div className="flex items-center justify-between border-b-[0.95px] border-b-[#DFDFDF] pb-[16px]">
            <h5 className="font-bold text-[19px] text-[#000000]">Invoice</h5>
            <StorefrontIcon />
          </div>
          <div className="flex flex-col gap-[12px]">
            <GridData
              data={invoiceDetails}
              className="sm:grid-cols-1 gap-1.5 border-b-[0.95px] border-b-[#DFDFDF] py-[16px]"
              gridItemClassName="grid grid-cols-2 justify-between"
              titleClassName="text-[#000000]"
              valueClassName="font-semibold text-[#000000] text-end"
            />
            <GridData
              data={totals}
              className="sm:grid-cols-1 gap-1.5 border-b-[0.95px] border-b-[#DFDFDF] py-[16px]"
              gridItemClassName="grid grid-cols-2 justify-between"
              titleClassName="text-[#000000]"
              valueClassName="font-semibold text-[#000000] text-end"
            />
            <GridData
              data={items}
              className="sm:grid-cols-1 gap-1.5 border-b-[0.95px] border-b-[#DFDFDF] py-[16px]"
              gridItemClassName="grid grid-cols-2 justify-between"
              titleClassName="text-[#000000]"
              valueClassName="font-semibold text-[#000000] text-end"
            />
            <Button type="button" className="rounded-4xl">
              Download
            </Button>
          </div>
          {/* <MinusIcon /> */}
        </div>
      </div>
    </div>
  );
};

export default PharmacyInvoice;
