import axios from "axios";

export default class UserDateService {
  axios: any;

  constructor() {
    this.axios = axios.create({
      baseURL: "https://api.homologation.cliqdrive.com.br/auth/profile/",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("tokenAccess")}`,
        'Accept': 'application/json;version=v1_web',
        'Content-Type': 'application/json'
      },
    });
  }

  async getUserProfile() {
    try {
      const response = await this.axios.get("/");
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }
}