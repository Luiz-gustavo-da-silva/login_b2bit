import React from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const userService = new UserService();

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    userService.logout();
    const userAuthenticated = userService.userAuthenticated();
    if (!userAuthenticated) {
      navigate("/Login");
    }
  };

  return (
    <header className={styles.header}>
      <Button type="button" onClick={logout} disabled={false} text="Logout" />
    </header>
  );
};

export default Header;
