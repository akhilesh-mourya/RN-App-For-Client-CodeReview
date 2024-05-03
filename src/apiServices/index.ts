// API.js
import axios from 'axios';
import {Config} from 'react-native-config';

const api = axios.create({
  baseURL: Config.BASE_URL,
});
console.log('BASE ULR  ====> ', Config.BASE_URL);
api.interceptors.request.use(
  async config => {
    if (global?.token) {
      // console.log('access token is:', global.token);
      config.headers.Authorization = `Bearer ${global?.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
