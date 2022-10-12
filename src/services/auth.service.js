import axios from "axios";

const API_URL = "https://book-spring.azurewebsites.net/api/v1/";

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
      .post(API_URL + "auth/login", {
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
    .post(API_URL + "auth/logout");
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "users/register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();