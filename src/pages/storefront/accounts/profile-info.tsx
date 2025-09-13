import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import { Input } from "@/components/ui/input";

const StorefrontProfileInformation = () => {
  return (
    <DashboardDetailLayout showBack={false} title="Profile Information">
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 max-w-4xl mx-auto">
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Email" />
        <Input placeholder="Phone Number" />
        <Input placeholder="Address" />
      </div>
    </DashboardDetailLayout>
  );
};

export default StorefrontProfileInformation;
