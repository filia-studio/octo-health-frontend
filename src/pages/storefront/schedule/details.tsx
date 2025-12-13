import HospitalDetails from "@/components/features/details-component";
import RatingsList from "@/components/features/ratings/rating-list";
import { useFetch } from "@/hooks/use-fetch";
import type { IAppointmentReview } from "@/types/review";
import React from "react";
import { useParams } from "react-router-dom";

const HospitalPage: React.FC = () => {
  const { id } = useParams();
  const { data } = useFetch<any>(`healthcare/${id}`, {
    useAuth: false,
    // onSuccess: (data) => {
    //   console.log({ data });

    //   setHospital(data);
    // },
    errorMessage: "Failed to load patients",
  });

  const { data: ratingsData } = useFetch<{
    data: IAppointmentReview[];
    message: string;
    success: boolean;
  } | null>(`healthcare-ratings/with-comments`, {
    useAuth: true,
    hideToast: "success",
    errorMessage: "Failed to fetch appointment reviews",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <HospitalDetails hospital={data} />
      <RatingsList ratings={ratingsData?.data || []} />
    </div>
  );
};

export default HospitalPage;
