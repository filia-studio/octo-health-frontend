import HospitalCard from "@/components/features/cards/hospital";
import LoadingGrid from "@/components/features/common/loading-grid";
import { useFetch } from "@/hooks/use-fetch";
import { useStore } from "@/store";
import { storefrontUrl } from "@/routes/paths";
import type { Appointment } from "@/types/appointment";
import type {
  HealthcareFacilitiesResponse,
  HealthcareFacility,
  HealthcareListResponse,
  IHealthcare,
} from "@/types/healthcare";
import { Link } from "react-router-dom";

const StorefrontProviders = () => {
  const { patientAuth } = useStore();

  const { data, isLoading } = useFetch<HealthcareFacilitiesResponse>(
    "patient/get_nearby_healthcare/",
    {
      useAuth: true,
      hideToast: "success",
      params: { limit: "4" },
      errorMessage: "Failed to load healthcare providers",
    },
  );

  const { data: allProviders, isLoading: loadingAll } =
    useFetch<HealthcareListResponse>("healthcare/", {
      useAuth: false,
      hideToast: "success",
      params: { limit: "4" },
      errorMessage: "Failed to load healthcare providers",
    });

  const { data: patientAppointmentsData, isLoading: loadingAppointments } =
    useFetch<Appointment[]>("/appointment/", {
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

  const showRecentlyViewedSeeAll =
    uniqueAppointments && uniqueAppointments.length > 4;
  const showNearMeSeeAll = data?.data?.count && data.data.count > 4;
  const showAllProvidersSeeAll = providersist && providersist.length >= 4;

  return (
    <section className="space-y-10">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-4 pb-1 border-b">
            Recently viewed
          </h4>
          {showRecentlyViewedSeeAll && (
            <Link
              to={`${storefrontUrl}/providers/recently-viewed`}
              className="text-primary hover:underline text-sm cursor-pointer"
            >
              See All
            </Link>
          )}
        </div>
        {loadingAppointments ? (
          <LoadingGrid count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {uniqueAppointments?.slice(0, 4).map((appointment, index) => (
              <HospitalCard
                showCalendar={true}
                key={index}
                healthcare={appointment?.healthcare_details}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-4 pb-1 border-b">Near me</h4>
          {showNearMeSeeAll && (
            <Link
              to={`${storefrontUrl}/providers/near-me`}
              className="text-primary hover:underline text-sm cursor-pointer"
            >
              See All
            </Link>
          )}
        </div>
        {isLoading ? (
          <LoadingGrid count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyList?.slice(0, 4).map((healthcare, index) => (
              <HospitalCard
                showCalendar={true}
                key={index}
                healthcare={healthcare}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold mb-4 pb-1 border-b">
            All providers
          </h4>
          {showAllProvidersSeeAll && (
            <Link
              to={`${storefrontUrl}/providers/all`}
              className="text-primary hover:underline text-sm cursor-pointer"
            >
              See All
            </Link>
          )}
        </div>
        {loadingAll ? (
          <LoadingGrid count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {providersist?.slice(0, 4).map((provider, index) => (
              <HospitalCard
                showCalendar={true}
                key={index}
                healthcare={provider}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default StorefrontProviders;
