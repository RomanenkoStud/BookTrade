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

  getRequests(id, token) {
    return axios({
      method: 'get',
      url: API_URL + 'get-all-request-to-user/' + id,
      headers: {
        Authorization: token
      }
  })
  }

  acceptRequest(requestId, token) {
        return axios.post(API_URL + "accept-exchange", {
          requestId
        },
        {headers: { Authorization: token }}
        );
  }
}

export default new ExchangeService();