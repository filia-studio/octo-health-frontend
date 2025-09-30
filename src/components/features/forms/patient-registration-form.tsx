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
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSend } from "@/hooks/use-send";
import { useNavigate } from "react-router-dom";
import { hospitalUrl } from "@/routes/paths";
import { removeEmptyFields } from "@/lib/utils";
import { useState } from "react";
import { X } from "lucide-react";

const schema = z.object({
  insurance: z.array(
    z.object({
      name: z.string(),
      insurance_type: z.string(),
      insurance_plan: z.string(),
      hmo_id: z.string(),
    })
  ),
  user: z.object({
    photo: z.string(),
    email: z.string().email("Invalid email"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    contact_number: z.string().min(1, "Contact number is required"),
    address: z.string().min(1, "Address is required"),
    gender: z.string().min(1, "Gender is required"),
    user_type: z.enum(["admin", "doctor", "patient"]),
    date_of_birth: z.string().min(1, "Date of birth is required"),
  }),
});

type FormSchema = z.infer<typeof schema>;

const PatientRegistrationForm = ({ isAuth = false }: { isAuth?: boolean }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      insurance: [
        { name: "", insurance_type: "", insurance_plan: "", hmo_id: "" },
      ],
      user: {
        photo: "",
        email: "",
        first_name: "",
        last_name: "",
        contact_number: "",
        address: "",
        gender: "",
        user_type: "patient",
        date_of_birth: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "insurance",
  });

  const { mutate } = useSend<any, { message: string }>("patient/", {
    useAuth: false,
    onSuccess: () => navigate(`${hospitalUrl}/patient-management`),
    errorMessage: "An error occurred!",
    successMessage: "Patient record created successfully",
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const cleanedData = removeEmptyFields(data);
    mutate(cleanedData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto min-h-screen py-10 px-6 space-y-8"
      >
        <div className="flex justify-center space-x-4">
          <div
            className={`h-3 w-3 rounded-full ${
              step === 1 ? "bg-black" : "bg-gray-300"
            }`}
          />
          <div
            className={`h-3 w-3 rounded-full ${
              step === 2 ? "bg-black" : "bg-gray-300"
            }`}
          />
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              User Information
            </h2>
            {!isAuth && (
              <FormField
                control={form.control}
                name="user.photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-start space-y-3">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setPreview(url);
                              field.onChange(file);
                            }
                          }}
                        />
                        {preview && (
                          <div className="relative w-32 h-32">
                            <img
                              src={preview}
                              alt="Profile Preview"
                              className="w-32 h-32 rounded-full object-cover border shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPreview(null);
                                field.onChange("");
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="user.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="user.first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user.last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="user.contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="user.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        classNamePrefix="react-select"
                        value={{ value: field.value, label: field.value }}
                        onChange={(val: any) => field.onChange(val?.value)}
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
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
                name="user.date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end mt-10">
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-full bg-black text-white px-8 py-2"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Insurance Information
            </h2>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg p-6 space-y-6 shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name={`insurance.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Name</FormLabel>
                        <FormControl>
                          <Select
                            classNamePrefix="react-select"
                            placeholder="Select insurance provider"
                            value={{ value: field.value, label: field.value }}
                            onChange={(val: any) => field.onChange(val?.value)}
                            options={[
                              { value: "Reliance", label: "Reliance" },
                              { value: "AXA Mansard", label: "AXA Mansard" },
                            ]}
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
                  {isAuth && (
                    <FormField
                      control={form.control}
                      name={`insurance.${index}.hmo_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HMO ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter HMO ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {!isAuth && (
                    <FormField
                      control={form.control}
                      name={`insurance.${index}.insurance_type`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Type</FormLabel>
                          <FormControl>
                            <Select
                              classNamePrefix="react-select"
                              placeholder="Select insurance type"
                              value={{ value: field.value, label: field.value }}
                              onChange={(val: any) =>
                                field.onChange(val?.value)
                              }
                              options={[
                                { value: "Private", label: "Private" },
                                { value: "Group", label: "Group" },
                              ]}
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
                  )}
                </div>
                {!isAuth && (
                  <FormField
                    control={form.control}
                    name={`insurance.${index}.insurance_plan`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insurance Plan</FormLabel>
                        <FormControl>
                          <Select
                            classNamePrefix="react-select"
                            placeholder="Select insurance plan"
                            value={{ value: field.value, label: field.value }}
                            onChange={(val: any) => field.onChange(val?.value)}
                            options={[
                              { value: "Gold", label: "Gold" },
                              { value: "Platinum", label: "Platinum" },
                            ]}
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
                )}

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="mt-2"
                  >
                    Remove Insurance
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  name: "",
                  insurance_type: "",
                  insurance_plan: "",
                  hmo_id: "",
                })
              }
            >
              + Add Insurance
            </Button>

            <div className="flex justify-between mt-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-black text-white px-8 py-2"
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default PatientRegistrationForm;
