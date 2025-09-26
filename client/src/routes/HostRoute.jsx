import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import useRole from "../hooks/useRole";

const HostRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  if (role === "host") return children;
  return <Navigate to={`/dashboard`} replace="true" />;
};

export default HostRoute;
