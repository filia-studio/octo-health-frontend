import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import PillDropdown from "@/components/features/pills/dropdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/use-fetch";
import { useSend } from "@/hooks/use-send";
import { useStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const initialValues = {
  account_name: "",
  account_number: "",
  bank: "",
};

const schema = z.object({
  account_name: z.string().min(1, "Account name is required"),
  account_number: z.string().min(1, "Account number is required"),
  bank: z.string().min(1, "Bank is required"),
});

const HealthcarePaymentInformation = () => {
  const auth = useStore((s) => s.healthcareAuth);
  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const { data: banks, isLoading } = useFetch<{
    data: Array<{ name: string }>;
  }>("/bank", {
    useAuth: false,
    baseUrl: "https://api.paystack.co",
  });

  const { isLoading: isLoadingPaymentInfo } = useFetch<{
    data: {
    bank: string;
    account_name: string;
    account_number: string;
  }
  }>(`/healthcare/${auth?.details?.id}/get_healthcare_payment`, {
    onSuccess: (response) => {
      if (response?.data?.bank) {
        form.reset(response?.data);
      }
    },
  });

  const { isPending: isSubmitting, mutate: save } = useSend(
    `/healthcare/${auth.details?.id}/healthcare_payment/`,
    {
      successMessage: "Payment information saved successfully.",
    }
  );

  return (
    <DashboardDetailLayout title="Payment Information">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            save(data);
          })}
          className="space-y-6 max-w-[24rem] mx-auto py-10"
        >
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank</FormLabel>
                  <FormControl>
                    <PillDropdown
                      placeholder="Select bank"
                      className="w-full !h-[3.125rem] rounded-full text-center px-5 text-sm font-normal"
                      options={(banks?.data || []).map((bank) => ({
                        label: bank.name,
                        value: bank.name,
                      }))}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" isLoading={isLoading || isSubmitting || isLoadingPaymentInfo}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </DashboardDetailLayout>
  );
};

export default HealthcarePaymentInformation;
