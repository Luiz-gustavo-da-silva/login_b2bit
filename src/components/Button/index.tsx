import React from "react";
import styles from "./styles.module.css";
import { ButtonProps } from "../../types/buttonProps";

const Button: React.FC<ButtonProps> = ({ type = "button", text, onClick, disabled, arialLabel }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${styles.button} ${disabled ? styles.disabledButton : ""}`} aria-label={arialLabel}>{text}</button>
  );
};

export default Button;