import axios from 'axios';

const data = {};
const promises = {};

export const postData = (endpoint, data) => {
  if (data[endpoint]) {
    return Promise.resolve(data[endpoint]);
  }
  // avoid requesting the same data multiple times
  const promise = promises[endpoint] || axios.post(endpoint, data);
  promises[endpoint] = promise;
  return promise.then(res => {
    data[endpoint] = Object.assign(res.data);
    return data[endpoint];
  });
};
