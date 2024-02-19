import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PrivateRoutes = () => {
  // let auth = { token: false };
  const { currentUser } = useAppSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/signIn" />;
};

export default PrivateRoutes;
