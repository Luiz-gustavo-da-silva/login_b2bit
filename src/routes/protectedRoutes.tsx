import UserServices from "../services/UserService";
import { Navigate } from "react-router-dom";

const userService = new UserServices();

const ProtectedRoutes = ({ children }: any) => {
  const userAuthenticated = userService.userAuthenticated();
  return userAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
