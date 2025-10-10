import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";

const useBlock = (email = "") => {
  const axiosCommon = useAxiosCommon();
  //   console.log(email);

  const { data: status, isLoading } = useQuery({
    queryKey: ["blocked_user", email],
    enabled: !!email,
    queryFn: async () => {
      try {
        const { data } = await axiosCommon(`/block-user/${email}`);
        return data?.status ?? false;
      } catch (err) {
        // console.error("Error fetching block status:", err);
        return false; // return a fallback value
      }
    },
  });
  // console.log(status);

  return [status, isLoading];
};

export default useBlock;
