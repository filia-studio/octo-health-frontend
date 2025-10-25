import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store";

const StorefrontProfileInformation = () => {
  const { patient } = useStore();
  return (
    <DashboardDetailLayout showBack={false} title="Profile Information">
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 max-w-4xl mx-auto">
        <Input placeholder="First Name" value={patient?.user?.first_name} />
        <Input placeholder="Last Name" value={patient?.user?.last_name} />
        <Input placeholder="Email" value={patient?.user.email} />
        <Input
          placeholder="Phone Number"
          value={patient?.user?.contact_number}
        />
        <Input placeholder="Address" value={patient?.user?.address} />
      </div>
    </DashboardDetailLayout>
  );
};

export default StorefrontProfileInformation;
