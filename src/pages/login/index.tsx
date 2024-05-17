import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import useHighContrast from "../../hooks/highContrast";
import styles from "./styles.module.css";
import Footer from "../../components/footer";
import { notification } from "antd";
import { LoginForm } from "../../types/loginForm";

const userService = new UserService();
type NotificationType = "success" | "info" | "warning" | "error";

const Login = () => {
  const navigate = useNavigate();
  const [highContrast, toggleHighContrastMode] = useHighContrast();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const userAuthenticated = userService.userAuthenticated();
    if (userAuthenticated) {
      navigate("/profile");
    } else {
      document.getElementById("email")?.focus();
    }
  }, []);

  const openNotificationWithIcon = (type: NotificationType) => {
    if (type === "success") {
      api[type]({
        message: "Login feito com sucesso!",
        description: "Seja Bem-vindo",
      });
    } else {
      api[type]({
        message: "Erro no login",
        description: "Seu login falhou. Por favor, tente de novo!",
      });
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("A senha é obrigatória"),
  });

  const handleSubmit = async (values: LoginForm, { setSubmitting, resetForm }:any) => {
    try {
      const response = await userService.login(values);
      if (response === true) {
        openNotificationWithIcon("success");
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } else {
        openNotificationWithIcon("error");
      }
      setSubmitting(false);
    } catch (err) {
      console.error("An error occurred:", err);
      setSubmitting(false);
    }
    resetForm();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${styles.containerLogin}`}
    >
      {contextHolder}
      <header className={`w-full flex justify-start ${styles.header}`}>
        <button
          onClick={toggleHighContrastMode}
          className={styles.buttonHighContrast}
          aria-label="Toggle high contrast mode"
        >
          <i className="fas fa-adjust" aria-hidden="true"></i>
        </button>
      </header>

      <div className="flex items-center justify-center h-[calc(100vh-90px)]">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={`flex flex-col gap-4 ${styles.containerForm}`}>
              <div className="flex justify-center">
                <img
                  src={`${!highContrast ? "/logo_azul.svg" : "/logo_branco.svg"}`}
                  alt="Logo da empresa b2bit"
                  className={styles.imgLogo}
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="email" className={styles.labelRequired}>E-mail</label>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="@gmail.com"
                />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="password" className={styles.labelRequired}>Password</label>
                <Field
                  as={Input}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="****************"
                />
                <ErrorMessage name="password" component="div" className={styles.error} />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                text="Sign In"
                arialLabel="Botão de login"
              />
            </Form>
          )}
        </Formik>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
