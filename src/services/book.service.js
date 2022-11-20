import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/books/";


class BookService {
  addBook(book, image) {
    let user = JSON.parse(localStorage.getItem('user'));
   
    let bodyFormData = new FormData();
    bodyFormData.append('bookDto', book);
    bodyFormData.append('image', image, "filename.jpeg");
    
    return axios({
      method: 'post',
      url: API_URL + 'add?userId=' + user.id,
      data: bodyFormData,
      headers: {
      Authorization: user.token,
      'Content-Type': 'multipart/form-data' }
  })
  }

  
  getBookInfo(id, token) {
    return axios({
      method: 'get',
      url: API_URL + 'get-book/' + id,
      headers: {
        Authorization: token
      }
  })
  }

  getBooks(id, token) {
    return axios({
      method: 'get',
      url: API_URL + 'all-user-books/' + id,
      headers: {
        Authorization: token
      }
  })
  }

  getBooksAll(num) {
    return axios({
      method: 'get',
      url: API_URL + '?countOfBook=' +  num,
  })
  }

}

export default new BookService();