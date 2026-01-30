import PatientRegistrationForm from "@/components/features/forms/patient-registration-form";
import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import { useSend } from "@/hooks/use-send";
import { useStore } from "@/store";
import type { IPatient } from "@/types/patient";

const StorefrontProfileInformation = () => {
  const { setPatientAuth, patientAuth } = useStore();

  const { mutate, isPending } = useSend<unknown, { data: IPatient }>(
    `patient/${patientAuth?.details?.id}/`,
    {
      method: "patch",
      onSuccess: (data) =>
        setPatientAuth({ details: { ...patientAuth?.details, ...data?.data } }),
      successMessage: "Profile information has been updated successfully",
    }
  );

  return (
    <DashboardDetailLayout title="Profile Information">
      <PatientRegistrationForm
        isEdit
        loading={isPending}
        handleSubmit={mutate}
      />
    </DashboardDetailLayout>
  );
};

export default StorefrontProfileInformation;
