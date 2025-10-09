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
import { insuranceCoverages, providers } from "@/lib/constants";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Switch } from "@/components/ui/switch";
import type { HealthcareListResponse } from "@/types/healthcare";
import { useFetch } from "@/hooks/use-fetch";
import type { InsuranceProviderListResponse } from "@/types/insurance";

const StorefrontFileClaim = () => {
  const form = useForm({
    defaultValues: {
      type: "",
      otherType: "",
      isEmergency: false,
      isIncidentRelated: false,
      provider: "",
      coverage: "",
      from: "",
      to: "",
      diagnosis: "",
      totalCharges: "",
      paidOutOfPocket: false,
      supportingDocuments: [],
      invoice: [],
      receipts: [],
    },
  });

  const { data: insuranceProviderResponse } = useFetch<
    InsuranceProviderListResponse[]
  >("insurance_provider/", {
    useAuth: false,
    errorMessage: "Failed to load insurance providers",
  });

  const { data: healthcareProviderResponse } = useFetch<HealthcareListResponse>(
    "healthcare/",
    {
      useAuth: false,
      errorMessage: "Failed to load healthcare providers",
    }
  );

  const healthcareProvider =
    healthcareProviderResponse?.data?.map((provider) => ({
      label: provider.name,
      value: provider.id,
    })) || [];

  const insuranceProvider =
    insuranceProviderResponse?.map((provider) => ({
      label: provider.insurance.name,
      value: provider.insurance.id,
    })) || [];

  const typeOptions = [
    "Consultation",
    "Surgery",
    "Diagnosis",
    "Lab Consultation",
    "Therapy",
    "Other",
  ].map((type) => ({ label: type, value: type.toLowerCase() }));

  return (
    <DashboardDetailLayout title="File a Claim">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(console.log)}
          className="flex flex-col gap-6 max-w-sm mx-auto pt-8"
        >
          {/* SECTION 1 — CLAIM DETAILS */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Claim Details
            </h3>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Claim</FormLabel>
                  <FormControl>
                    <PillDropdown
                      placeholder="Select type"
                      className="w-full !h-[3.125rem] rounded-full text-center px-5"
                      options={typeOptions}
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("type") === "other" && (
              <FormField
                control={form.control}
                name="otherType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter claim type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Treatment Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Treatment End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis / Description of Treatment</FormLabel>
                  <FormControl>
                    <Input
                      type="textarea"
                      placeholder="Enter diagnosis or treatment details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* SECTION 2 — PROVIDER & INSURANCE */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Provider & Insurance
            </h3>

            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Healthcare Provider</FormLabel>
                  <FormControl>
                    <Select
                      isMulti={false}
                      value={healthcareProvider?.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(option) => field.onChange(option?.value)}
                      options={healthcareProvider}
                      classNames={{
                        control: (state) =>
                          `border !border-input !rounded-full !min-h-[3.125rem] px-3 !shadow-none ${
                            state.isFocused
                              ? "!border-ring ring-ring/50 ring-[3px]"
                              : ""
                          }`,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coverage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Provider</FormLabel>
                  <FormControl>
                    <Select
                      isMulti={true}
                      value={insuranceProvider?.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(option) => field.onChange(option)}
                      options={insuranceProvider}
                      classNames={{
                        control: (state) =>
                          `border !border-input !rounded-full !min-h-[3.125rem] px-3 !shadow-none ${
                            state.isFocused
                              ? "!border-ring ring-ring/50 ring-[3px]"
                              : ""
                          }`,
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Payment Details
            </h3>

            <FormField
              control={form.control}
              name="totalCharges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Charges</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter total charges"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paidOutOfPocket"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel>Did you pay out-of-pocket?</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("paidOutOfPocket") && (
              <FormField
                control={form.control}
                name="receipts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Receipts</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        className="h-auto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* SECTION 4 — ATTACHMENTS */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Attachments
            </h3>

            <FormField
              control={form.control}
              name="invoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital/Clinic Invoice (Itemized)</FormLabel>
                  <FormControl>
                    <Input type="file" multiple className="h-auto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supportingDocuments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supporting Documents</FormLabel>
                  <FormControl>
                    <Input type="file" multiple className="h-auto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button>Submit Claim</Button>
          </div>
        </form>
      </Form>
    </DashboardDetailLayout>
  );
};

export default StorefrontFileClaim;
