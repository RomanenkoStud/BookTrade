import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

const testData = {
  token: "ddddd",
  id: 5,
  username: "Test",
  role: "USER",
  email: "email@gmail.com"
}

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    axios
    .post(API_URL + "logout");
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();