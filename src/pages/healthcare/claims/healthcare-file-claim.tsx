import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
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
import { useFetch } from "@/hooks/use-fetch";
import { useSend } from "@/hooks/use-send";
import { useNavigate } from "react-router-dom";
import { healthcareUrl } from "@/routes/paths";
import type { InsuranceProviderListResponse } from "@/types/insurance";
import { useState } from "react";
import type { IPatient } from "@/types/patient";

interface HospitalFileClaimFormValues {
  patient_id: string;
  insurance_provider_id: string;
  diagnosis_icd_code: string;
  consultation_date: string;
  medical_report: string;
  treatment_procedure_note: string;
  prescriptions_and_investigation_ordered: string;
  invoice: FileList | string;
  // cost_breakdown: string;
  additional_documents: FileList | string;
}

const HealthcareFileClaim = () => {
  const navigate = useNavigate();
  const form = useForm<HospitalFileClaimFormValues>({
    defaultValues: {
      patient_id: "",
      insurance_provider_id: "",
      diagnosis_icd_code: "",
      consultation_date: "",
      medical_report: "",
      treatment_procedure_note: "",
      prescriptions_and_investigation_ordered: "",
      invoice: "",
      // cost_breakdown: "",
      additional_documents: "",
    },
  });

  const [selectedPatient, setSeletectedPatient] = useState<IPatient | null>(
    null
  );

  const { data: patientResponse } = useFetch<IPatient[]>("patient/", {
    useAuth: false,
    errorMessage: "Failed to load patients",
  });

  const { data: insuranceProviders } = useFetch<
    InsuranceProviderListResponse[]
  >("insurance_provider/", {
    useAuth: false,
    errorMessage: "Failed to load insurance providers",
  });

  const { mutate, isPending } = useSend<unknown, { message: string }>(
    "healthcare-claim/",
    {
      useAuth: true,
      onSuccess: () => navigate(`${healthcareUrl}/claims`),
      errorMessage: "An error occurred while submitting claim",
      successMessage: "Claim filed successfully on behalf of patient",
    }
  );

  const patientOptions =
    patientResponse?.map((p) => ({
      label: `${p.user.first_name} ${p.user.last_name}`,
      value: p.id,
    })) || [];

  const patientInsuranceArray =
    selectedPatient?.insurance_details?.map((ins) => {
      const match = insuranceProviders?.find(
        (prov) => prov?.insurance?.id === ins?.name
      );

      return {
        ...ins,
        insurance: match ? { ...match.insurance, id: match?.id } : null,
      };
    }) || [];

  const insuranceOptions =
    patientInsuranceArray
      .filter((provider) => provider?.insurance)
      .map((provider) => ({
        label: provider?.insurance?.name || "",
        value: provider?.insurance?.id || "",
      })) || [];

  const handlePatientSelect = (option: { label: string; value: string }) => {
    form.setValue("patient_id", option.value);
    const selectedPatient = patientResponse?.find(
      (patient: IPatient) => patient?.id === option.value
    ) as IPatient;
    setSeletectedPatient(selectedPatient);
  };

  const onSubmit = (values: HospitalFileClaimFormValues) => {
    const formData = new FormData();
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
    <DashboardDetailLayout title="File Claim on Behalf of Patient">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 max-w-lg mx-auto pt-8"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-800">
              Patient Information
            </h3>

            <FormField
              control={form.control}
              name="patient_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Patient</FormLabel>
                  <FormControl>
                    <Select
                      isMulti={false}
                      value={patientOptions.find(
                        (opt) => opt.value === field.value
                      )}
                      onChange={(option) =>
                        handlePatientSelect(
                          option as {
                            label: string;
                            value: string;
                          }
                        )
                      }
                      options={patientOptions}
                      placeholder="Select patient"
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
                      value={insuranceOptions.find(
                        (opt) => opt.value === field.value
                      )}
                      onChange={(option) => field.onChange(option?.value)}
                      options={insuranceOptions}
                      placeholder="Select insurance provider"
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

          {/* Claim Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Claim Details
            </h3>

            <FormField
              control={form.control}
              name="diagnosis_icd_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter diagnosis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consultation_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date(s) of Consultation / Treatment</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutral-800">
              Medical Documentation
            </h3>

            <FormField
              control={form.control}
              name="medical_report"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Medical Report / Case Summary</FormLabel>
                  <FormControl>
                    <Input
                      type="textarea"
                      placeholder="Enter medical report"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatment_procedure_note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatment / Procedure Notes</FormLabel>
                  <FormControl>
                    <Input
                      type="textarea"
                      placeholder="Enter procedure notes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prescriptions_and_investigation_ordered"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prescriptions / Investigations Ordered</FormLabel>
                  <FormControl>
                    <Input
                      type="textarea"
                      placeholder="Enter prescriptions and investigations"
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
              Billing & Attachments
            </h3>

            <FormField
              control={form.control}
              name="invoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Itemized Hospital Bill / Invoice</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
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
              name="additional_documents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Documents</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
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

export default HealthcareFileClaim;
