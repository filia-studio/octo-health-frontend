import PatientRegistrationForm, {
  type FormSchema,
} from "@/components/features/forms/patient-registration-form";
import DashboardDetailLayout from "@/components/features/layouts/dashboard-detail";
import { useSend } from "@/hooks/use-send";
import { healthcareUrl } from "@/routes/paths";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreatePatient: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = useSend<unknown, { message: string }>("patient/", {
    useAuth: false,
    onSuccess: () => navigate(`${healthcareUrl}/patient-management`),
    errorMessage: "An error occurred!",
    successMessage: "Patient record created successfully",
  });

  const handleSubmit = (data: FormSchema) => {
    const formData = new FormData();

    data.insurance.forEach((item, index) => {
      formData.append(`insurance[${index}][name]`, item.name);
      formData.append(
        `insurance[${index}][insurance_type]`,
        item.insurance_type
      );
      formData.append(
        `insurance[${index}][insurance_plan]`,
        item.insurance_plan
      );
      formData.append(`insurance[${index}][hmo_id]`, item.hmo_id);
    });

    Object.entries(data.user).forEach(([key, value]) => {
      formData.append(`user[${key}]`, value);
    });

    formData.append("longitude", data.longitude);
    formData.append("latitude", data.latitude);
    formData.append("zipcode", data.zipcode);
    mutate(formData);
  };
  return (
    <DashboardDetailLayout title="Create Patient">
      <PatientRegistrationForm handleSubmit={handleSubmit} />
    </DashboardDetailLayout>
  );
};

export default CreatePatient;
