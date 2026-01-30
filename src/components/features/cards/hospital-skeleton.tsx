import { Card } from "@/components/ui/card";

const HospitalCardSkeleton = () => {
  return (
    <Card className="py-0 gap-0 lg:max-w-[17rem] h-[22.625rem] overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-[9.3125rem] bg-gray-200" />

      <div className="pt-2.5 px-4 pb-8">
        {/* Badge skeleton */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        {/* Title skeleton */}
        <div className="h-5 w-full bg-gray-200 rounded mb-2" />
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />

        {/* Address skeleton */}
        <div className="h-4 w-full bg-gray-200 rounded mb-1" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />

        {/* Bottom section skeleton */}
        <div className="flex items-center justify-between mt-11">
          <div className="flex gap-1.5">
            <div className="rounded-full w-9 h-9 bg-gray-200" />
            <div className="rounded-full w-9 h-9 bg-gray-200" />
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </Card>
  );
};

export default HospitalCardSkeleton;
