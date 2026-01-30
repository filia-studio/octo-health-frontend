import HospitalCard from "@/components/features/cards/hospital";
import LoadingGrid from "@/components/features/common/loading-grid";
import Pagination from "@/components/features/pagination";
import { useFetch } from "@/hooks/use-fetch";
import { storefrontUrl } from "@/routes/paths";
import type { HealthcareListResponse } from "@/types/healthcare";
import { Link } from "react-router-dom";
import { useState } from "react";

const AllProviders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Server-side pagination via API params (if supported)
  const { data: allProviders, isLoading: loadingAll } =
    useFetch<HealthcareListResponse>("healthcare/", {
      useAuth: false,
      hideToast: "success",
      params: {
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      },
      errorMessage: "Failed to load healthcare providers",
    });

  const providersList = allProviders?.data || [];

  // If API doesn't return count, use array length as approximation
  // This assumes if we get full limit, there might be more
  const totalItems =
    providersList.length === itemsPerPage
      ? currentPage * itemsPerPage + 1 // Show next page button
      : currentPage * itemsPerPage - (itemsPerPage - providersList.length);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Healthcare Providers</h2>
        <Link
          to={`${storefrontUrl}/providers`}
          className="text-sm text-primary hover:underline"
        >
          Back to Providers
        </Link>
      </div>

      {loadingAll ? (
        <LoadingGrid count={12} />
      ) : providersList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {providersList.map((provider) => (
              <HospitalCard
                showCalendar={false}
                key={provider.id}
                healthcare={provider}
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
            No healthcare providers found
          </p>
        </div>
      )}
    </section>
  );
};

export default AllProviders;
