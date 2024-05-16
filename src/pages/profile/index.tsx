import React, { useState } from "react";
import styles from "./styles.module.css";

const Profile = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.button}>Logout</button>
      </header>
      <div className={styles.containerProfile}>
        <div className={styles.containerInfo}>
          <div className={styles.containerImageProfile}>
            <div><p>Profile Pictore</p></div>
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
                <input
                  type="email"
                  id="email"
                  placeholder="Luiz Gustavo da Silva"
                />
              </div>
              <div>
                <label htmlFor="email">
                  Your <b>E-mail</b>
                </label>
                <input type="text" placeholder="luiz@gmail.com" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
