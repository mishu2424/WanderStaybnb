import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RoomReviewCard = ({ review }) => {
  const { user, rating, comment, date } = review || {};

  // Convert ISO date to readable format
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Generate star icons dynamically
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i)
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5)
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
    return stars;
  };

  return (
<div className="bg-white shadow-md rounded-2xl p-5 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-all duration-300">
  {/* User Image */}
  <div className="flex-shrink-0">
    <img
      src={user?.photoURL}
      alt={user?.name}
      className="w-16 h-16 rounded-full object-cover border-2 border-green-800"
    />
  </div>

  {/* Review Content */}
  <div className="flex-1 flex flex-col justify-between">
    <div>
      {/* Top: name + stars */}
      <div className="flex flex-wrap items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{user?.name}</h3>
        <div className="flex items-center space-x-1">{renderStars()}</div>
      </div>

      {/* Middle: comment */}
      <p className="mt-2 text-gray-600 text-sm italic leading-relaxed">
        “{comment}”
      </p>
    </div>

    {/* Bottom: date (always aligned) */}
    <p className="mt-4 text-xs text-gray-400 self-end sm:self-start">
      Posted on {formattedDate}
    </p>
  </div>
</div>
  );
};

export default RoomReviewCard;
