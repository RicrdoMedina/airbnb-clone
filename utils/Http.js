import axios from "axios";

class Http {
  static http = null;

  static init(baseURL) {
    this.http = axios.create({
      baseURL,
    });
  }

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
