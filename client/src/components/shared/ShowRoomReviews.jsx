import { useQuery } from "@tanstack/react-query";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import LoadingSpinner from "./LoadingSpinner";
import RoomReviewCard from "../Rooms/RoomReviewCard";

const ShowRoomReview = ({ id }) => {
  // console.log(id);
  const axiosCommon = useAxiosCommon();
  const {
    data: roomReviews = [],
    isPending: isReviewDataPending,
    isLoading: isReviewDataLoading,
  } = useQuery({
    queryKey: ["show-room-reviews", id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/room-review/${id}`);
      return data;
    },
  });
  // console.log(roomReviews);

  if (isReviewDataLoading || isReviewDataPending) return <LoadingSpinner />;

  return (
    <>
    
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5"
      >
        {roomReviews.length > 0 &&
          roomReviews.map((review) => (
            <RoomReviewCard key={review?._id} review={review} />
          ))}
      </div>
    </>
  );
};

export default ShowRoomReview;
