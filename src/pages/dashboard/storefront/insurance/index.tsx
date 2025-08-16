import InsuranceCard from "@/components/features/cards/insurance";

const StorefrontInsurance = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <InsuranceCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default StorefrontInsurance;
