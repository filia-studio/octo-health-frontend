import HospitalCard from "@/components/features/cards/hospital";
import { useFetch } from "@/hooks/use-fetch";
import { useStore } from "@/store";
import type { IHealthcare, HealthcareListResponse } from "@/types/healthcare";

const StorefrontSchedule = () => {
  const { setHealthcare } = useStore();

  const { data } = useFetch<HealthcareListResponse>("healthcare/", {
    useAuth: false,
    onSuccess: (data) => {
      setHealthcare(data?.data);
    },
    errorMessage: "Failed to load healthcare providers",
  });

  const healthcareList: IHealthcare[] | null = data?.data || [];
  return (
    <section>
      {healthcareList?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthcareList?.map((healthcare: IHealthcare, index: number) => (
            <HospitalCard key={index} healthcare={healthcare} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-lg font-medium text-center">
          No healthcare providers available
        </p>
      )}
    </section>
  );
};

export default StorefrontSchedule;
