import axios from 'axios';
import { API } from '../static/constants';

const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default api;