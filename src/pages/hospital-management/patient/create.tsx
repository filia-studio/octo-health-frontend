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

const schema = z.object({
  insurance: z.array(
    z.object({
      name: z.string(),
      // .min(1, "Insurance name is required"),
      insurance_type: z.string(),
      // .min(1, "Insurance type is required"),
      insurance_plan: z.string(),
      // .min(1, "Insurance plan is required"),
    })
  ),
  // .min(1, "At least one insurance entry is required"),

  user: z.object({
    photo: z.string(),
    email: z.string().email("Invalid email"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    contact_number: z.string().min(1, "Contact number is required"),
    address: z.string().min(1, "Address is required"),
    gender: z.string().min(1, "Gender is required"),
    user_type: z.enum(["admin", "doctor", "patient"]), // extend if needed
    date_of_birth: z.string().min(1, "Date of birth is required"),
  }),
});

type FormSchema = z.infer<typeof schema>;

const PatientRegistration = () => {
  const navigate = useNavigate();

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      insurance: [{ name: "", insurance_type: "", insurance_plan: "" }],
      user: {
        photo: "",
        email: "",
        first_name: "",
        last_name: "",
        contact_number: "",
        address: "",
        gender: "",
        user_type: "admin",
        date_of_birth: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "insurance",
  });

  const { mutate } = useSend<
    {
      insurance: {
        name: string;
        insurance_type: string;
        insurance_plan: string;
      }[];

      user: {
        photo: string;
        email: string;
        first_name: string;
        last_name: string;
        contact_number: string;
        address: string;
        gender: string;
        user_type: string;
        date_of_birth: string;
      };
    },
    { message: string }
  >("patient/", {
    useAuth: false,
    onSuccess: (data, variables) => {
      navigate(`${hospitalUrl}/patient-management`);
    },
    errorMessage: "An error occurred!",
    successMessage: "Patient record created successfully",
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const cleanedData = removeEmptyFields(data);
    mutate(cleanedData);
  };

  const handleCancel = () => {
    form.reset();
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[40rem] mx-auto space-y-6 py-12"
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Insurance</h2>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border rounded-lg p-4 space-y-4 relative"
            >
              <FormField
                control={form.control}
                name={`insurance.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter insurance name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`insurance.${index}.insurance_type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter insurance type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`insurance.${index}.insurance_plan`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Plan</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter insurance plan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  className="mt-2"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({ name: "", insurance_type: "", insurance_plan: "" })
            }
          >
            + Add Insurance
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">User Details</h2>
          <FormField
            control={form.control}
            name="user.photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter photo URL"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
                    // accept="image/*"
                    // {...form.register("user.photo")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      value={{ value: field.value, label: field.value }}
                      onChange={(val: any) => field.onChange(val?.value)}
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.user_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <Select
                      value={{ value: field.value, label: field.value }}
                      onChange={(val: any) => field.onChange(val?.value)}
                      options={[
                        { value: "admin", label: "Admin" },
                        { value: "doctor", label: "Doctor" },
                        { value: "patient", label: "Patient" },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

        <div className="flex justify-between mt-12">
          <Button
            onClick={handleCancel}
            //   disabled={isCreating}
            type="button"
            className="rounded-[12.5rem] w-full max-w-[6.5rem] lg:max-w-[11.8rem] h-10 lg:h-12 text-sm lg:text-lg font-semibold"
          >
            Cancel
          </Button>
          <Button
            //   disabled={isCreating}
            type="submit"
            className="rounded-[12.5rem] bg-black w-full max-w-[6.5rem] lg:max-w-[11.8rem] h-10 lg:h-12 text-sm lg:text-lg font-semibold"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientRegistration;
