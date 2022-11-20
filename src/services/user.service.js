import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/users/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
  
  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }
}

export default new UserService();