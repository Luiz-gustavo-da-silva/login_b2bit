import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { validationEmail, validationPassword } from "../../utils/validation";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom"; 

const userService = new UserService();

const Login = () => {
  const [loading, setLoading] = useState<boolean>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        email: email,
        password: password,
      });
      if (response === true) {
        alert('usuário Logado com Sucesso')
        navigate('/profile')
      }else {
        alert("Login failed");
      }
      setLoading(false);
    } catch (err) {
      console.error("An error occurred:", err);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerFormLogin}>
        <div>
          <img
            src="/logo_azul.svg"
            alt="Logo da empresa b2bit"
            className={styles.imgFormLogin}
          />
        </div>
        <div>
          <form onSubmit={handleSubmit} className={styles.containerForm}>
            <div>
              <label htmlFor="email">E-mail</label>
              <Input
                type="email"
                name="email"
                placeholder="@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
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
              disabled={loading === true || !validationInputs()}
              text="Entrar"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
