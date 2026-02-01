import HospitalCard from "@/components/features/cards/hospital";
import LoadingGrid from "@/components/features/common/loading-grid";
import Pagination from "@/components/features/pagination";
import { useFetch } from "@/hooks/use-fetch";
import { storefrontUrl } from "@/routes/paths";
import type { HealthcareFacilitiesResponse } from "@/types/healthcare";
import { Link } from "react-router-dom";
import { useState } from "react";

const NearMeProviders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Server-side pagination via API params
  const { data, isLoading } = useFetch<HealthcareFacilitiesResponse>(
    "patient/get_nearby_healthcare/",
    {
      useAuth: true,
      hideToast: "success",
      params: {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      },
      errorMessage: "Failed to load nearby healthcare providers",
    },
  );

  const nearbyList = data?.data?.facilities || [];
  const totalItems = data?.data?.count || 0;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Nearby Healthcare Providers</h2>
          {data?.data?.radius_km && (
            <p className="text-sm text-gray-600 mt-1">
              Within {data.data.radius_km} km of your location
            </p>
          )}
        </div>
        <Link
          to={`${storefrontUrl}/providers`}
          className="text-sm text-primary hover:underline"
        >
          Back to Providers
        </Link>
      </div>

      {isLoading ? (
        <LoadingGrid count={12} />
      ) : nearbyList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyList.map((healthcare) => (
              <HospitalCard
                showCalendar={false}
                key={healthcare.id}
                healthcare={healthcare}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No nearby healthcare providers found
          </p>
        </div>
      )}
    </section>
  );
};

export default NearMeProviders;
