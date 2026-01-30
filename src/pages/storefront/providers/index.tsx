import HospitalCard from "@/components/features/cards/hospital";
import { useFetch } from "@/hooks/use-fetch";
import { useStore } from "@/store";
import type { Appointment } from "@/types/appointment";
import type {
  HealthcareFacilitiesResponse,
  HealthcareFacility,
  HealthcareListResponse,
  IHealthcare,
} from "@/types/healthcare";

const StorefrontProviders = () => {
  const { patientAuth } = useStore();

  const { data, isLoading } = useFetch<HealthcareFacilitiesResponse>(
    "patient/get_nearby_healthcare/",
    {
      useAuth: true,
      hideToast: "success",
      params: { limit: "5" },
      onSuccess: (data) => {},
      errorMessage: "Failed to load healthcare providers",
    },
  );

  const { data: allProviders, isLoading: loadingAll } =
    useFetch<HealthcareListResponse>("healthcare/", {
      useAuth: false,
      hideToast: "success",
      params: { limit: "5" },
      onSuccess: (data) => {
        // setHealthcare(data?.data);
      },
      errorMessage: "Failed to load healthcare providers",
    });

  const {
    data: patientAppointmentsData,
    isLoading: loadingAppointments,
    refetch: refetchAppointments,
  } = useFetch<Appointment[]>("/appointment/", {
    hideToast: "success",
    params: {
      patient_id: patientAuth?.details?.id,
    },
  });

  const uniqueAppointments = patientAppointmentsData?.reduce(
    (acc: Appointment[], appointment) => {
      if (
        !acc.find(
          (item: Appointment) => item.healthcare === appointment.healthcare,
        )
      ) {
        acc.push(appointment);
      }
      return acc;
    },
    [],
  );

  const providersist: IHealthcare[] | null = allProviders?.data || [];

  const nearbyList: HealthcareFacility[] | null = data?.data?.facilities || [];

  return (
    <section className="space-y-10">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-4 pb-1 border-b">
            Recently viewed
          </h4>
          <span>See All</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {uniqueAppointments?.map((appointment, index) => (
            <HospitalCard
              showCalendar={false}
              key={index}
              healthcare={appointment?.healthcare_details}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-4 pb-1 border-b">Near me</h4>
          <span>See All</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearbyList?.map((healthcare, index) => (
            <HospitalCard
              showCalendar={false}
              key={index}
              healthcare={healthcare}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-4 pb-1 border-b">
            All providers
          </h4>
          <span>See All</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {providersist?.map((provider, index) => (
            <HospitalCard
              showCalendar={false}
              key={index}
              healthcare={provider}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorefrontProviders;
