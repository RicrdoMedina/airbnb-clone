import axios from "axios";

const API_URL =
  process.env.NUXT_PUBLIC_SERVER_URL || "http://localhost:3000/api";

class Http {
  static http = axios.create({
    baseURL: API_URL,
  });

  static async get(url) {
    try {
      const response = await this.http.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async post(url, data, auth) {
    try {
      const response = await this.http.post(url, data, auth);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async patch(url, data) {
    try {
      const response = await this.http.patch(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async put(url, data) {
    try {
      const response = await this.http.put(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async delete(url) {
    try {
      const response = await this.http.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default Http;
