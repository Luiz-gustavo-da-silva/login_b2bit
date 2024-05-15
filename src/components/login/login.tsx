import React, { useState } from "react";
import styles from "./styles.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.homologation.cliqdrive.com.br/auth/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json;version=v1_web',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {

        const data = await response.json();
        const user = data.user;
        const tokens = data.tokens;

        console.log("User:", user);
        console.log("Tokens:", tokens);


        alert("Login successful");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.containerFormLogin}>
        <div>
          <img src="/logo_azul.svg" alt="Logo da empresa b2bit" className={styles.imgFormLogin}/>
        </div>
        <div>
          <form onSubmit={handleSubmit} className={styles.containerForm}>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="@gmail.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="****************"
                required
              />
            </div>
            <button type="submit" className={styles.button}>Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
