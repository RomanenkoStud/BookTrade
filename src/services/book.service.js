import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/";

class BookService {
  addBook(book) {
    return axios.post(API_URL + "books", {
      //post title, author, description, genre, isbn, img
    });
  }
}

export default new BookService();