import UserServices from "../services/UserService";
import { Navigate } from "react-router-dom";
import { ProtectedRoutesProps } from "../types/protectedRoutedRoutes";

const userService = new UserServices();

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const userAuthenticated = userService.userAuthenticated();
  return userAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
