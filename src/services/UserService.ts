import axios from "axios";
import { LoginForm } from "../types/loginForm";

export default class UserServices {
  axios: any;

  constructor() {
    this.axios = axios.create({
      baseURL: "https://api.homologation.cliqdrive.com.br/auth/login/",
      headers: {
              'Accept': 'application/json;version=v1_web',
              'Content-Type': 'application/json'
        },
    });
  }

  async login(dados: LoginForm) {
    try {
      const response = await this.axios.post("/", {email: dados.email, password: dados.password});

      if (response.data) {
        const { user, tokens } = response.data;
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("tokenAccess", tokens.access);
        localStorage.setItem("tokenRefresh", tokens.refresh);

        return true;
      }

      return false;
    } catch (error) {
      console.error("An error occurred:", error);
      return false;
    }
  }

  userAuthenticated() {
    return localStorage.getItem("tokenAccess") != undefined ? true : false;
  }

  async logout () {
    localStorage.removeItem("tokenAccess")
    localStorage.removeItem("tokenRefresh")
    localStorage.removeItem("name")
    localStorage.removeItem("email")
  }

}
