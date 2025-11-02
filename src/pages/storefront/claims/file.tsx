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
import { useForm } from "react-hook-form";
import Select from "react-select";
import type { HealthcareListResponse } from "@/types/healthcare";
import { useFetch } from "@/hooks/use-fetch";
import type { InsuranceProviderListResponse } from "@/types/insurance";
import { useStore } from "@/store";
import { useSend } from "@/hooks/use-send";
import { useNavigate } from "react-router-dom";
import { storefrontUrl } from "@/routes/paths";

interface FileClaimFormValues {
  insurance_provider_id: string;
  supporting_documents: FileList | string;
  invoice: FileList | string;
  payment_receipt: FileList | string;
  claim_type: string;
  healthcare_provider: string;
  total_charges: string;
  treatment_date: string;
  diagnosis: string;
  payment_reciept: FileList | string;
}

const StorefrontFileClaim = () => {
  const navigate = useNavigate();
  const form = useForm<FileClaimFormValues>({
    defaultValues: {
      insurance_provider_id: "",
      supporting_documents: "",
      invoice: "",
      payment_receipt: "",
      claim_type: "",
      healthcare_provider: "",
      total_charges: "",
      treatment_date: "",
      diagnosis: "",
      payment_reciept: "",
    },
  });

  const { patient } = useStore();

  const { data: insuranceProviderResponse } = useFetch<
    InsuranceProviderListResponse[]
  >("insurance_provider/", {
    useAuth: false,
    hideToast: "success",
    errorMessage: "Failed to load insurance providers",
  });

  const { data: healthcareProviderResponse } = useFetch<HealthcareListResponse>(
    "healthcare/",
    {
      useAuth: false,
      hideToast: "success",
      errorMessage: "Failed to load healthcare providers",
    }
  );

  const { mutate, isPending } = useSend<unknown, { message: string }>(
    "patient-claims/create/",
    {
      useAuth: true,
      onSuccess: () => navigate(`${storefrontUrl}/claims`),
      errorMessage: "An error occurred!",
      successMessage: "Patient claims record created successfully",
    }
  );

  const healthcareProvider =
    healthcareProviderResponse?.data?.map((provider) => ({
      label: provider.name,
      value: provider.id,
    })) || [];

  const patientInsuranceArray =
    patient?.insurance_details?.map((ins) => {
      const match = insuranceProviderResponse?.find(
        (prov) => prov?.insurance?.id === ins?.name
      );

      return {
        ...ins,
        insurance: match ? { ...match.insurance, id: match?.id } : null,
      };
    }) || [];

  const insuranceProvider =
    patientInsuranceArray
      .filter((provider) => provider?.insurance)
      .map((provider) => ({
        label: provider?.insurance?.name || "",
        value: provider?.insurance?.id || "",
      })) || [];

  const typeOptions = [
    "Consultation",
    "Surgery",
    "Diagnosis",
    "Lab Consultation",
    "Therapy",
    "Other",
  ].map((type) => ({ label: type, value: type.toLowerCase() }));

  const onSubmit = (values: FileClaimFormValues) => {
    const formData = new FormData();
    console.log({ values });

    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof FileList) {
        Array.from(value).forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value ?? "");
      }
    });

    mutate(formData);
  };

  return (
    <DashboardDetailLayout title="File a Claim">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 max-w-sm mx-auto pt-8"
        >
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Claim Details
            </h3>

            <FormField
              control={form.control}
              name="claim_type"
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

            <FormField
              control={form.control}
              name="treatment_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date(s) of Treatment or Admission</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Provider & Insurance
            </h3>

            <FormField
              control={form.control}
              name="healthcare_provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Healthcare Provider</FormLabel>
                  <FormControl>
                    <Select
                      isMulti={false}
                      value={healthcareProvider.find(
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
              name="insurance_provider_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Provider</FormLabel>
                  <FormControl>
                    <Select
                      isMulti={false}
                      value={insuranceProvider.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(option) => field.onChange(option?.value)}
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
              name="total_charges"
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
          </div>

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
                    <Input
                      type="file"
                      multiple
                      className="h-auto"
                      onChange={(e) =>
                        field.onChange(e.target.files as FileList)
                      }
                    />
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
                    <Input
                      type="file"
                      multiple
                      className="h-auto"
                      onChange={(e) =>
                        field.onChange(e.target.files as FileList)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_reciept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Receipts</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      className="h-auto"
                      onChange={(e) =>
                        field.onChange(e.target.files as FileList)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" isLoading={isPending}>
              Submit Claim
            </Button>
          </div>
        </form>
      </Form>
    </DashboardDetailLayout>
  );
};

export default StorefrontFileClaim;
