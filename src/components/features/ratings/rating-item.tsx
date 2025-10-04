import React from "react";
// import { Rating } from "../types/hospital";

const RatingItem: React.FC<{ rating: any }> = ({ rating }) => {
  return (
    <div className="flex flex-col py-3 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <span className="font-medium text-sm text-gray-800">{rating.user}</span>
        <span className="text-red-500 font-semibold">{rating.score} / 5.0</span>
      </div>
      <p className="text-sm text-gray-600">{rating.comment}</p>
    </div>
  );
};

export default RatingItem;
