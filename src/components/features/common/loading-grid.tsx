import HospitalCardSkeleton from "../cards/hospital-skeleton";

const LoadingGrid = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <HospitalCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingGrid;
