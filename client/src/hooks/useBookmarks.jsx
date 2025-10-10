import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useBookmarks = (roomId) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  // console.log(roomId);

  const { data: isBookMarked, isLoading:bookMarkLoading } = useQuery({
    queryKey: ["book-mark",user?.email,roomId],
    enabled: !loading && !!user?.email && !!roomId,
    queryFn: async () => {
      const { data } = await axiosSecure(`/bookmarks/${user?.email}/${roomId}`);
      return data?.bookmarked || false;
    },
  });
  return [isBookMarked, bookMarkLoading];
};

export default useBookmarks;
