interface RatingProps {
  rating: number;
  onChange: (value: number) => void;
}

const Rating = ({ rating, onChange }: RatingProps) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className="focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-8 h-8 cursor-pointer transition 
              ${
                rating >= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300"
              }
            `}
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.336 24 12 19.897 4.664 24 6 15.596 0 9.748l8.332-1.593z" />
          </svg>
        </button>
      ))}
    </div>
  );
};
export default Rating;
