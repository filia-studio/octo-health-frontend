import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Select from "react-select";
import PillDropdown from "../pills/dropdown";
import { healthcareProviders } from "@/lib/constants";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import type { HealthcareService } from "@/types/healthcare";
import { Button } from "@/components/ui/button";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useGetLocation } from "@/hooks/use-get-location";
import { useSend } from "@/hooks/use-send";
import { useNavigate } from "react-router-dom";
import { healthcareUrl } from "@/routes/paths";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  healthcare_type: z.string().min(1, "Healthcare type is required"),
  owner_name: z.string().min(1, "Owner's name is required"),
  email: z.email("Invalid email"),
  license_number: z.string().min(1, "License number is required"),
  tax_id_number: z.string().min(1, "Tax ID number is required"),
  contact_number: z.string().min(1, "Contact number is required"),
  website: z.url("Invalid website"),
  address: z.string().min(1, "Address is required"),
  services: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "At least one service is required"),
});

const HealthcareRegistrationForm = () => {
  const navigate = useNavigate();
  const { inputRef, isLoaded, getLocation } = useGetLocation();
  const [services, setServices] = useState<{ value: string; label: string }[]>(
    []
  );

  const form = useForm({
    defaultValues: {
      services: [],
      healthcare_type: "hospital",
      owner_name: "",
      email: "",
      license_number: "",
      tax_id_number: "",
      contact_number: "",
      website: "",
      address: "",
    },
    resolver: zodResolver(schema),
  });

  const { isLoading } = useFetch<{ data: HealthcareService[] }>("/services/", {
    useAuth: false,
    hideToast: "success",
    onSuccess: (data) =>
      setServices(
        data.data.map((service) => ({
          value: service.id,
          label: service.name,
        }))
      ),
  });

  const { isPending: isCreating, mutate: createHealthcare } = useSend(
    "/healthcare/",
    {
      useAuth: false,
      onSuccess: () => navigate(`${healthcareUrl}/auth`),
    }
  );

  const loading = isLoading || isCreating;

  const onSubmit = ({ services, ...data }: z.infer<typeof schema>) => {
    const values = {
      ...data,
      ...getLocation(data.address),
      services: services.map((service) => service.value),
    };

    createHealthcare(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[40rem] mx-auto space-y-6 py-12 px-4"
      >
        <FormField
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
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="healthcare_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Healthcare Type</FormLabel>
                <FormControl>
                  <PillDropdown
                    placeholder="Select healthcare type"
                    className="w-full !h-[3.125rem] rounded-full text-center px-5"
                    options={healthcareProviders.map((provider) => ({
                      label: provider,
                      value: provider,
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
        </div>
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Services</FormLabel>
              <FormControl>
                <Select
                  isMulti
                  value={field.value}
                  onChange={field.onChange}
                  options={services}
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
                {isLoaded ? (
                  <StandaloneSearchBox
                    onPlacesChanged={() => {
                      form.setValue(
                        field.name,
                        inputRef?.current?.getPlaces()?.[0]
                          ?.formatted_address ?? ""
                      );
                    }}
                    onLoad={(ref) => (inputRef.current = ref)}
                  >
                    <Input placeholder="Enter location" {...field} />
                  </StandaloneSearchBox>
                ) : (
                  <Input placeholder="Enter location" {...field} />
                )}
              </FormControl>
              <FormDescription className="text-xs">
                Kindly select location from the dropdown provided.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="license_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter license number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="owner_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner's Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter owner's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact_number"
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
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

export default HealthcareRegistrationForm;
