import HospitalCard from "@/components/features/cards/hospital";
import type { IHealthcare } from "@/types/healthcare";

const StorefrontProviders = () => {
  return (
    <section className="space-y-10">
      <div>
        <h4 className="text-lg font-semibold mb-4 pb-1 border-b">Recently viewed</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <HospitalCard
              showCalendar={false}
              key={index}
              healthcare={{} as IHealthcare}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 pb-1 border-b">Near me</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <HospitalCard
              showCalendar={false}
              key={index}
              healthcare={{} as IHealthcare}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-4 pb-1 border-b">All providers</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 16 }).map((_, index) => (
            <HospitalCard
              showCalendar={false}
              key={index}
              healthcare={{} as IHealthcare}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorefrontProviders;
