import PharmacyDrugCard from "@/components/features/cards/pharmacy-drug";

const StorefrontPharmacy = () => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <PharmacyDrugCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default StorefrontPharmacy;
