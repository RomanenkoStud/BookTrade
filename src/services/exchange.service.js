import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/requests/";


class ExchangeService {
  addRequest(sendersBookId, recipientBookId, 
    userFromId, userToId, token) {
        return axios.post(API_URL + "process-request", {
            sendersBookId, recipientBookId, 
            userFromId, userToId
        },
        {headers: { Authorization: token }}
        );
  }

}

export default new ExchangeService();