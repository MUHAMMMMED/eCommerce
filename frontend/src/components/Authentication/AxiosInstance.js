

import axios from 'axios';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import Config from '../config';

let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
let refresh_token = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";
const baseURL = `${Config.baseURL}/api/accounts/`;

const AxiosInstance = axios.create({
  baseURL: baseURL,
  'Content-type': 'application/json',
  headers: { Authorization: localStorage.getItem('token') ? `Bearer ${accessToken}` : "" },
});

AxiosInstance.interceptors.request.use(async req => {
  if (accessToken) {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
      try {
        const resp = await axios.post(`${baseURL}/token/refresh/`, { refresh: refresh_token });
        accessToken = resp.data.access;
        localStorage.setItem('token', JSON.stringify(accessToken));
        req.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        // If refresh token fails, clear tokens and reject request
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        accessToken = "";
        refresh_token = "";
        req.headers.Authorization = "";
        localStorage.removeItem('user'); // Remove user data

        return Promise.reject(error);
      }
    } else {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
  } else {
    req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : "";
  }

  return req;
});

export default AxiosInstance;