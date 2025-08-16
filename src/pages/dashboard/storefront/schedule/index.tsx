import HospitalCard from "@/components/features/cards/hospital";

const StorefrontSchedule = () => {
  return (
    <section>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <HospitalCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default StorefrontSchedule;
