import { Button } from "@/components/ui/button";
import InsurancePlanCard from "../cards/insurance-plan";
import CustomModal from "./custom";

const InsurancePlans = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <CustomModal
      open={open}
      onOpenChange={onOpenChange}
      className="sm:max-w-[54rem]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsurancePlanCard />
        <InsurancePlanCard plan="intermediate" />
        <InsurancePlanCard plan="basic" />
      </div>
      <Button
        variant="outline"
        onClick={() => onOpenChange(false)}
        className="rounded-[3.125rem] w-fit px-9 mx-auto border-white text-white bg-transparent"
      >
        Exit
      </Button>
    </CustomModal>
  );
};

export default InsurancePlans;
