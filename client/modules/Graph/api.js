import axios from 'axios';

const API = 'http://localhost:8000/api';

// const API_ID = id => `${API}/${id}`;

const handleError = (error) => {
  console.warn(error);
  return null;
};

export const getStatus = handler => axios.get(API)
  .then((response) => {
    // console.log(response);
    handler(response.data);
  })
  .catch(handleError);

export const getGraph = (params, handler) =>
  axios.get('http://localhost:8000/api/kraken/graph', params)
    .then((response) => {
      // console.log(response);
      handler(response.data);
    })
    .catch(handleError);
