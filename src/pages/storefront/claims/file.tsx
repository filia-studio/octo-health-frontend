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

const StorefrontFileClaim = () => {
  const form = useForm({
    defaultValues: {
      from: "",
      to: "",
      type: "",
      otherType: "",
      isEmergency: false,
      isIncidentRelated: false,
      totalcharges: "",
      supporting_documents: [],
      provider: "",
      coverage: "",
    },
  });

  const providerOptions = providers.map((provider) => ({
    label: provider.name,
    value: provider.id,
  }));

  return (
    <DashboardDetailLayout title="File a claim">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(console.log)}
          className="flex flex-col gap-6 max-w-sm mx-auto pt-8"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of claim</FormLabel>
                <FormControl>
                  <PillDropdown
                    placeholder="Select type"
                    className="w-full !h-[3.125rem] rounded-full text-center px-5"
                    options={[
                      "consultation",
                      "surgery",
                      "diagnosis",
                      "lab consultation",
                      "therapy",
                      "other",
                    ].map((type) => ({
                      label: type,
                      value: type,
                    }))}
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
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Healthcare Provider</FormLabel>
                <FormControl>
                  <Select<{ label: string; value: string }>
                    isMulti={false}
                    value={providerOptions.find(
                      (option) => option.value === field.value
                    )}
                    onChange={field.onChange}
                    options={providerOptions}
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
                <FormLabel>Insurance coverage</FormLabel>
                <FormControl>
                  <PillDropdown
                    placeholder="Select coverage"
                    className="w-full !h-[3.125rem] rounded-full text-center px-5"
                    options={insuranceCoverages.map((coverage) => ({
                      label: coverage,
                      value: coverage,
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
            name="totalcharges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total charges</FormLabel>
                <FormControl>
                  <Input placeholder="Enter total charges" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supporting_documents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supporting Documents</FormLabel>
                <FormControl>
                  <Input type="file" multiple {...field} className="h-auto" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </DashboardDetailLayout>
  );
};

export default StorefrontFileClaim;
