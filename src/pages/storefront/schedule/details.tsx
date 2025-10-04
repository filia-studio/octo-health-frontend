import HospitalDetails from "@/components/features/details-component";
import RatingsList from "@/components/features/ratings/rating-list";
import { useFetch } from "@/hooks/use-fetch";
import React from "react";
import { useParams } from "react-router-dom";

const ratings: any = [
  {
    id: 1,
    user: "Imran Oke",
    score: 2.5,
    comment: "Good service. Bad hygiene",
  },
  {
    id: 2,
    user: "Sade Babalakin",
    score: 3.5,
    comment: "Good service. Nice environment.",
  },
  {
    id: 3,
    user: "Ngozi Coker",
    score: 4.5,
    comment: "Fast service. Very professional.",
  },
  {
    id: 4,
    user: "Tai Balogun",
    score: 4.5,
    comment: "Caring doctors. Smooth experience.",
  },
  {
    id: 5,
    user: "Imran Oke",
    score: 4.5,
    comment: "Fast service. Very professional.",
  },
  {
    id: 6,
    user: "Imran Oke",
    score: 5.0,
    comment: "Helpful nurses. Comfortable setting.",
  },
];

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

  console.log("data", data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <HospitalDetails hospital={data} />
      <RatingsList ratings={ratings} />
    </div>
  );
};

export default HospitalPage;
