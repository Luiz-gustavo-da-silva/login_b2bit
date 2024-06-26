import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Header from "../../components/header";
import Input from "../../components/Input";
import UserDateService from "../../services/UserDateService";
import { Button, Result } from "antd";
import Footer from "../../components/footer";
import { ProfileData } from "../../types/profileData";

const userDateService = new UserDateService();

const Profile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [urlImg, seturlImg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    try {
      const userProfile: ProfileData = await userDateService.getUserProfile();
      setEmail(userProfile.email);
      setName(userProfile.name);
      seturlImg(userProfile.avatar.high);
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
    <div className={`min-h-screen ${styles.container}`}>
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-90px)]">
        {error ? (
          <Result
            status="error"
            title="Failed to Load Profile"
            subTitle="Please click the button below to send a new request."
            extra={[
              <Button type="primary" key="console" onClick={reload}>
                Reload
              </Button>,
            ]}
          ></Result>
        ) : (
          <form className={`flex flex-col gap-4 ${styles.containerForm}`}>
            <div
              className="flex flex-col items-center justify-center gap-3"
            >
              <div>
                <p>Profile Picture</p>
              </div>
              <div className={`flex align-center justify-center ${styles.containerImageProfile}`}>
                <img src={urlImg ? urlImg : '/user.png'} alt="User image" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="name">
                Your <b>Name</b>
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Luiz Gustavo da Silva"
                value={name || ""}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">
                Your <b>E-mail</b>
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="luiz@gmail.com"
                value={email || ""}
                readOnly
              />
            </div>
          </form>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
