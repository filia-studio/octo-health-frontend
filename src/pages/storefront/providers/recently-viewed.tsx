import HospitalCard from "@/components/features/cards/hospital";
import LoadingGrid from "@/components/features/common/loading-grid";
import Pagination from "@/components/features/pagination";
import { useFetch } from "@/hooks/use-fetch";
import { useStore } from "@/store";
import { storefrontUrl } from "@/routes/paths";
import type { Appointment } from "@/types/appointment";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

const RecentlyViewedProviders = () => {
  const { patientAuth } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: patientAppointmentsData, isLoading: loadingAppointments } =
    useFetch<Appointment[]>("/appointment/", {
      hideToast: "success",
      params: {
        patient_id: patientAuth?.details?.id,
      },
    });

  const uniqueAppointments = useMemo(() => {
    return patientAppointmentsData?.reduce(
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
  }, [patientAppointmentsData]);

  const totalItems = uniqueAppointments?.length || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAppointments = uniqueAppointments?.slice(startIndex, endIndex);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recently Viewed Providers</h2>
        <Link
          to={`${storefrontUrl}/providers`}
          className="text-sm text-primary hover:underline"
        >
          Back to Providers
        </Link>
      </div>

      {loadingAppointments ? (
        <LoadingGrid count={12} />
      ) : paginatedAppointments && paginatedAppointments.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedAppointments.map((appointment) => (
              <HospitalCard
                showCalendar={false}
                key={appointment.id}
                healthcare={appointment?.healthcare_details}
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
            No recently viewed providers found
          </p>
        </div>
      )}
    </section>
  );
};

export default RecentlyViewedProviders;
