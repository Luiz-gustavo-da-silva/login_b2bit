import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { validationEmail, validationPassword } from "../../utils/validation";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import useHighContrast from "../../hooks/highContrast";
import styles from "./styles.module.css"
import Footer from "../../components/footer";

const userService = new UserService();

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [highContrast, toggleHighContrastMode] = useHighContrast();

  useEffect(() => {
    const userAuthenticated = userService.userAuthenticated();
    if (userAuthenticated) {
      navigate("/profile");
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validationInputs = () => {
    return validationEmail(email) && validationPassword(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await userService.login({
        email,
        password,
      });
      if (response === true) {
        alert("usuário Logado com Sucesso");
        navigate("/profile");
      } else {
        alert("Login failed");
      }
      setLoading(false);
    } catch (err) {
      console.error("An error occurred:", err);
      setLoading(false);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${styles.containerLogin}`}>
      <header className={`w-full flex justify-end p-4 ${styles.header}`}>
        <button
          onClick={toggleHighContrastMode}
          className={styles.buttonHighContrast}
        >
          <i className="fas fa-adjust"></i>
        </button>
      </header>

      <div className="flex items-center justify-center h-[calc(100vh-90px)]">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col gap-4 ${styles.containerForm}`}
        >
          <div className="flex justify-center">
            <img
              src={`${!highContrast ? "/logo_azul.svg" : "/logo_branco.svg"}`}
              alt="Logo da empresa b2bit"
              className={styles.imgLogo}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="email">
              E-mail
            </label>
            <Input
              type="email"
              name="email"
              placeholder="@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <label htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="****************"
              onChange={handlePasswordChange}
            />
          </div>  
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !validationInputs()}
            text="Sign In"
          />
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
