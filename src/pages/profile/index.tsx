import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Header from "../../components/header";
import Input from "../../components/Input";
import UserDateService from "../../services/UserDateService";
import { Button, Result } from "antd";

const userDateService = new UserDateService();

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    try {
      const userProfile = await userDateService.getUserProfile();
      console.log(userProfile);
      setEmail(userProfile.email);
      setName(userProfile.name);
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Error fetching user profile:", error);
    }
  }

  const reload = () => {
    fetchUserProfile();
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerProfile}>
        <div className={styles.containerInfo}>
          {error ? (
            <Result
              status="error"
              title="Erro ao carregar perfil"
              subTitle="Por favor, clique no botão abaixo para enviar uma nova requisição."
              extra={[
                <Button type="primary" key="console" onClick={reload}>
                  Recarregar
                </Button>,
              ]}
            >
            </Result>
          ) : (
            <>
              <div className={styles.containerImageProfile}>
                <div>
                  <p>Profile Picture</p>
                </div>
                <div>
                  <img src="/logo_azul.svg" alt="Foto do usuário logado" />
                </div>
              </div>

              <div>
                <form className={styles.containerForm}>
                  <div>
                    <label htmlFor="name">
                      Your <b>Name</b>
                    </label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Luiz Gustavo da Silva"
                      value={name || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <label htmlFor="email">
                      Your <b>E-mail</b>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="luiz@gmail.com"
                      value={email || ""}
                      readOnly
                    />
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
