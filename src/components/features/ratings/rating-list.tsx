import React from "react";
import RatingItem from "./rating-item";

const RatingsList: React.FC<{ ratings: any }> = ({ ratings }) => {
  const avg = ratings.length
    ? ratings.reduce((sum: any, r: any) => sum + r.score, 0) / ratings.length
    : 0;

  return (
    <div className="col-span-1 bg-white rounded-lg shadow p-6 w-full">
      <h3 className="text-xl font-semibold mb-4">
        Ratings <span className="text-red-500">{avg.toFixed(1)}</span> / 5.0
      </h3>
      <div className="divide-y divide-gray-200">
        {ratings.map((r: any) => (
          <RatingItem key={r.id} rating={r} />
        ))}
      </div>
    </div>
  );
};

export default RatingsList;
