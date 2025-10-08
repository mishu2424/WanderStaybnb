import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosCommon = useAxiosCommon();

  console.log(user?.email);
  const { data: role, isLoading } = useQuery({
    queryKey: ["user-role",user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosCommon(`/user/${user?.email}`);
      return data.role;
    },
  });
  return [role, isLoading];
};

export default useRole;
