import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Select, { type SingleValue } from "react-select";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { useSend } from "@/hooks/use-send";
import { useNavigate } from "react-router-dom";
import { insuranceUrl } from "@/routes/paths";

const schema = z.object({
  email: z.email("Invalid email"),
  accreditation_number: z.string().min(1, "License number is required"),

  phone_number: z.string().min(1, "Phone number is required"),

  address: z.string().min(1, "Address is required"),
  insurance_id: z.string().min(1, "Insurance is required"),
});

const InsuranceRegistrationForm = () => {
  const navigate = useNavigate();
  const [insuranceList, setInsuranceList] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const form = useForm({
    defaultValues: {
      insurance_id: "",
      email: "",
      accreditation_number: "",
      phone_number: "",
      address: "",
    },
    resolver: zodResolver(schema),
  });

  const { isLoading } = useFetch<
    {
      id: string;
      created_at: string;
      updated_at: string;
      name: string;
      hmo_id: string;
    }[]
  >("/insurance/", {
    useAuth: false,
    hideToast: "success",
    onSuccess: (data) => {
      const insuranceList = data?.map((item) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });
      setInsuranceList(insuranceList);
    },
  });

  const { isPending: isCreating, mutate: createInsuranceProvider } = useSend(
    "/insurance_provider/",
    {
      useAuth: false,
      onSuccess: () => navigate(`${insuranceUrl}/auth`),
    }
  );

  const loading = isLoading || isCreating;

  const onSubmit = ({ ...data }: z.infer<typeof schema>) => {
    const values = {
      ...data,
    };

    createInsuranceProvider(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[40rem] mx-auto space-y-6 py-12 px-4"
      >
        {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="email"
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
        <FormField
          control={form.control}
          name="insurance_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Insurance</FormLabel>
              <FormControl>
                <Select
                  value={insuranceList.find((opt) => opt.value === field.value)}
                  onChange={(
                    option: SingleValue<{
                      label: string;
                      value: string;
                    }>
                  ) => field.onChange(option?.value)}
                  options={insuranceList}
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        <FormField
          control={form.control}
          name="accreditation_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accreditation Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter license number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
            control={form.control}
            name="tax_id_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax ID Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter tax id number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        {/* </div> */}

        <FormField
          control={form.control}
          name="phone_number"
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

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div className="flex justify-end mt-12">
          <Button
            isLoading={loading}
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

export default InsuranceRegistrationForm;
