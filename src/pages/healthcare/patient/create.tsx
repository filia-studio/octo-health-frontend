import PatientRegistrationForm, {
  type FormSchema,
} from "@/components/features/forms/patient-registration-form";
import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import { useSend } from "@/hooks/use-send";
import { healthcareUrl } from "@/routes/paths";
import { useStore } from "@/store";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreatePatient: React.FC = () => {
  const healthcare = useStore();
  const navigate = useNavigate();
  const { mutate, isPending } = useSend<unknown, { message: string }>(
    "healthcare/create_patient/",
    {
      useAuth: false,
      onSuccess: () => navigate(`${healthcareUrl}/patient-management`),
      errorMessage: "An error occurred!",
      successMessage: "Patient record created successfully",
    }
  );

  const handleSubmit = (data: FormSchema) => {
    const payload = {
      ...data,
      healthcare_id: healthcare?.healthcareAuth?.details?.id,
    };
    // const formData = new FormData();

    // data.insurance.forEach((item, index) => {
    //   formData.append(`insurance[${index}][name]`, item.name);
    //   formData.append(
    //     `insurance[${index}][insurance_type]`,
    //     item.insurance_type
    //   );
    //   formData.append(
    //     `insurance[${index}][insurance_plan]`,
    //     item.insurance_plan
    //   );
    //   formData.append(`insurance[${index}][hmo_id]`, item.hmo_id);
    // });

    // Object.entries(data.user).forEach(([key, value]) => {
    //   formData.append(`user[${key}]`, value);
    // });

    // formData.append("longitude", data.longitude);
    // formData.append("latitude", data.latitude);
    // formData.append("zipcode", data.zipcode);
    mutate(payload);
  };
  return (
    <DashboardDetailLayout title="Create Patient">
      <PatientRegistrationForm loading={isPending} handleSubmit={handleSubmit} />
    </DashboardDetailLayout>
  );
};

export default CreatePatient;
