// import { useState } from "react";
// import HospitalCard from "@/components/features/cards/hospital";
// import { useFetch } from "@/hooks/use-fetch";
// import { useStore } from "@/store";
// import type { IHealthcare, HealthcareListResponse } from "@/types/healthcare";

// // Add pagination parameters type
// interface PaginationParams {
//   page: number;
//   limit: number;
// }

// const StorefrontSchedule = () => {
//   const { setHealthcare } = useStore();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8); // Adjust based on your grid (4x2)

//   // Calculate pagination parameters
//   const paginationParams: PaginationParams = {
//     page: currentPage,
//     limit: itemsPerPage,
//   };

//   const { data, isLoading } = useFetch<HealthcareListResponse>("healthcare/", {
//     useAuth: false,
//     hideToast: "success",
//     params: paginationParams, // Pass pagination params to API
//     onSuccess: (data) => {
//       setHealthcare(data?.data);
//     },
//     errorMessage: "Failed to load healthcare providers",
//   });

//   const healthcareList: IHealthcare[] | null = data?.data || [];
//   const totalItems = data?.data?.length || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   console.log({ data });

//   // Pagination controls component
//   const PaginationControls = () => {
//     if (totalPages <= 1) return null;

//     const pageNumbers = [];
//     const maxVisiblePages = 5;

//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     return (
//       <div className="flex flex-col items-center justify-center mt-8 space-y-4">
//         {/* Page info */}
//         <div className="text-sm text-gray-600">
//           Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//           {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
//           results
//         </div>

//         {/* Pagination buttons */}
//         <div className="flex items-center space-x-2">
//           {/* First & Previous */}
//           <button
//             onClick={() => setCurrentPage(1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//           >
//             First
//           </button>

//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//           >
//             Previous
//           </button>

//           {/* Page numbers */}
//           {startPage > 1 && (
//             <>
//               <button
//                 onClick={() => setCurrentPage(1)}
//                 className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
//               >
//                 1
//               </button>
//               {startPage > 2 && <span className="px-2">...</span>}
//             </>
//           )}

//           {pageNumbers.map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-3 py-1 rounded-md border transition-colors ${
//                 currentPage === page
//                   ? "bg-blue-500 text-white border-blue-500"
//                   : "border-gray-300 hover:bg-gray-50"
//               }`}
//             >
//               {page}
//             </button>
//           ))}

//           {endPage < totalPages && (
//             <>
//               {endPage < totalPages - 1 && <span className="px-2">...</span>}
//               <button
//                 onClick={() => setCurrentPage(totalPages)}
//                 className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
//               >
//                 {totalPages}
//               </button>
//             </>
//           )}

//           {/* Next & Last */}
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//             }
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//           >
//             Next
//           </button>

//           <button
//             onClick={() => setCurrentPage(totalPages)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//           >
//             Last
//           </button>
//         </div>

//         {/* Items per page selector (optional) */}
//         <div className="flex items-center space-x-2 text-sm">
//           <span>Items per page:</span>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => {
//               // You might want to move itemsPerPage to state if you want to change it
//               // const newLimit = parseInt(e.target.value);
//               // setItemsPerPage(newLimit);
//               // setCurrentPage(1); // Reset to first page when changing items per page
//             }}
//             className="border rounded px-2 py-1"
//           >
//             <option value="8">8</option>
//             <option value="12">12</option>
//             <option value="16">16</option>
//             <option value="20">20</option>
//           </select>
//         </div>
//       </div>
//     );
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="text-center py-8">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         <p className="mt-2 text-gray-600">Loading healthcare providers...</p>
//       </div>
//     );
//   }

//   return (
//     <section>
//       {healthcareList?.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {healthcareList.map((healthcare: IHealthcare, index: number) => (
//               <HospitalCard key={index} healthcare={healthcare} />
//             ))}
//           </div>

//           {/* Pagination controls */}
//           <PaginationControls />
//         </>
//       ) : (
//         <p className="text-gray-500 text-lg font-medium text-center">
//           No healthcare providers available
//         </p>
//       )}
//     </section>
//   );
// };

// export default StorefrontSchedule;

// import { useState } from "react";
// import HospitalCard from "@/components/features/cards/hospital";
// import { useFetch } from "@/hooks/use-fetch";
// import { useStore } from "@/store";
// import type {
//   IHealthcare,
//   HealthcareListResponse,
//   HealthcareFacilitiesResponse,
//   HealthcareFacility,
// } from "@/types/healthcare";

// // Add pagination parameters type
// interface PaginationParams {
//   page: number;
//   limit: number;
// }

// const StorefrontSchedule = () => {
//   const { setFacilities } = useStore();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(8); // Adjust based on your grid (4x2)

//   // Calculate pagination parameters
//   const paginationParams: PaginationParams = {
//     page: currentPage,
//     limit: itemsPerPage,
//   };

//   const { data, isLoading } = useFetch<HealthcareFacilitiesResponse>(
//     "patient/get_nearby_healthcare/",
//     {
//       useAuth: true,
//       hideToast: "success",
//       params: paginationParams, // Pass pagination params to API
//       onSuccess: (data) => {
//         setFacilities(data?.data?.facilities);
//       },
//       errorMessage: "Failed to load healthcare providers",
//     },
//   );

//   const healthcareList: HealthcareFacility[] | null =
//     data?.data?.facilities || [];
//   const totalItems = data?.data?.count || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   console.log({ data });

//   // Pagination controls component
//   const PaginationControls = () => {
//     if (totalPages <= 1) return null;

//     const pageNumbers = [];
//     const maxVisiblePages = 5;

//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     return (
//       <div className="flex flex-col items-center justify-center mt-8 space-y-4">
//         {/* Page info */}
//         <div className="text-sm text-gray-600">
//           Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//           {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
//           results
//         </div>

//         {/* Pagination buttons */}
//         <div className="flex items-center space-x-2">
//           {/* First & Previous */}
//           <button
//             onClick={() => setCurrentPage(1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//           >
//             First
//           </button>

//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//           >
//             Previous
//           </button>

//           {/* Page numbers */}
//           {startPage > 1 && (
//             <>
//               <button
//                 onClick={() => setCurrentPage(1)}
//                 className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
//               >
//                 1
//               </button>
//               {startPage > 2 && <span className="px-2">...</span>}
//             </>
//           )}

//           {pageNumbers.map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-3 py-1 rounded-md border transition-colors ${
//                 currentPage === page
//                   ? "bg-blue-500 text-white border-blue-500"
//                   : "border-gray-300 hover:bg-gray-50"
//               }`}
//             >
//               {page}
//             </button>
//           ))}

//           {endPage < totalPages && (
//             <>
//               {endPage < totalPages - 1 && <span className="px-2">...</span>}
//               <button
//                 onClick={() => setCurrentPage(totalPages)}
//                 className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
//               >
//                 {totalPages}
//               </button>
//             </>
//           )}

//           {/* Next & Last */}
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//             }
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//           >
//             Next
//           </button>

//           <button
//             onClick={() => setCurrentPage(totalPages)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//           >
//             Last
//           </button>
//         </div>

//         {/* Items per page selector (optional) */}
//         <div className="flex items-center space-x-2 text-sm">
//           <span>Items per page:</span>
//           <select
//             value={itemsPerPage}
//             onChange={(e) => {
//               // You might want to move itemsPerPage to state if you want to change it
//               // const newLimit = parseInt(e.target.value);
//               // setItemsPerPage(newLimit);
//               // setCurrentPage(1); // Reset to first page when changing items per page
//             }}
//             className="border rounded px-2 py-1"
//           >
//             <option value="8">8</option>
//             <option value="12">12</option>
//             <option value="16">16</option>
//             <option value="20">20</option>
//           </select>
//         </div>
//       </div>
//     );
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="text-center py-8">
//         <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//         <p className="mt-2 text-gray-600">Loading healthcare providers...</p>
//       </div>
//     );
//   }

//   return (
//     <section>
//       {healthcareList?.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {healthcareList.map(
//               (healthcare: HealthcareFacility, index: number) => (
//                 <HospitalCard key={index} healthcare={healthcare} />
//               ),
//             )}
//           </div>

//           {/* Pagination controls */}
//           <PaginationControls />
//         </>
//       ) : (
//         <p className="text-gray-500 text-lg font-medium text-center">
//           No healthcare providers available
//         </p>
//       )}
//     </section>
//   );
// };

// export default StorefrontSchedule;

import OverViewCard from "@/components/features/cards/overview";
import AppointmentsTable from "@/components/features/tables/appointments-table";
import ScheduleTabs from "@/components/features/tabs/schedule-tabs";
import { useFetch } from "@/hooks/use-fetch";
import { useStore } from "@/store";
import type { Appointment } from "@/types/appointment";
import { useState } from "react";

const tabs = ["Approved", "Pending", "Completed", "Declined", "Cancelled"];

const StorefrontSchedule = () => {
  const { patientAuth } = useStore();

  const [activeTab, setActiveTab] = useState("Approved");

  const {
    data: patientAppointmentsData,
    isFetching: loadingAppointments,
    refetch: refetchAppointments,
  } = useFetch<Appointment[]>("/appointment/", {
    hideToast: "success",
    params: {
      patient_id: patientAuth?.details?.id,
      status: activeTab.toLowerCase(),
    },
  });

  const overview = [
    {
      label: "Ongoing Appointments",
      value: "0",
    },
    {
      label: "Completed Appointments",
      value: "0",
    },
    {
      label: "Total Appointments",
      value: patientAppointmentsData?.length.toString() || "0",
    },
  ];

  // const { data } = useFetch<HealthcareListResponse>("healthcare/", {
  //   useAuth: false,
  //   hideToast: "success",
  //   onSuccess: (data) => {
  //     setHealthcare(data?.data);
  //   },
  //   errorMessage: "Failed to load healthcare providers",
  // });

  // const healthcareList: IHealthcare[] | null = data?.data || [];
  return (
    // <section>
    //   {healthcareList?.length > 0 ? (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    //       {healthcareList?.map((healthcare: IHealthcare, index: number) => (
    //         <HospitalCard key={index} healthcare={healthcare} />
    //       ))}
    //     </div>
    //   ) : (
    //     <p className="text-gray-500 text-lg font-medium text-center">
    //       No healthcare providers available
    //     </p>
    //   )}
    // </section>
    <div className="">
      <OverViewCard data={overview} />
      <ScheduleTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <AppointmentsTable
        isLoading={loadingAppointments}
        data={patientAppointmentsData ?? []}
        refresh={refetchAppointments}
        type="patient"
      />
    </div>
  );
};

export default StorefrontSchedule;
