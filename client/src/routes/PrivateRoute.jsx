import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (user) return children;
  return (
    <Navigate
      to={"/login"}
      state={{ from: location }} // <— whole location object
      replace="true"
    ></Navigate>
  );
};

export default PrivateRoute;
