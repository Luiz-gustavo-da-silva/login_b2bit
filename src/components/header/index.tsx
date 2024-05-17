import React from "react";
import styles from "./styles.module.css";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import useHighContrast from "../../hooks/highContrast"; 

const userService = new UserService();

const Header = () => {
  const [highContrast, togglehighContrastMode] = useHighContrast();

  const navigate = useNavigate();

  const logout = () => {
    userService.logout();
    const userAuthenticated = userService.userAuthenticated();
    if (!userAuthenticated) {
      navigate("/Login");
    }
  };

  return (
    <header className={`flex items-center justify-between ${styles.header}`}>
      <button onClick={() => togglehighContrastMode()} className={styles.buttonHighContrast}><i className="fas fa-adjust"></i></button>
      <Button type="button" onClick={logout} disabled={false} text="Logout" />
    </header>
  );
};

export default Header;
