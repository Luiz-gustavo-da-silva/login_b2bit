import axios from 'axios';

export default class UserDateService {
  axiosInstance: any;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://api.homologation.cliqdrive.com.br/auth/profile",
      headers: {
        'Accept': 'application/json;version=v1_web',
        'Content-Type': 'application/json'
      }
    });

    this.axiosInstance.interceptors.request.use((config: any) => {
      const token = localStorage.getItem("tokenAccess");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error: any) => {
      return Promise.reject(error);
    });
  }

  async getUserProfile() {
    try {
      const response = await this.axiosInstance.get('/');
      return response.data;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }
}