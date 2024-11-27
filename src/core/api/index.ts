import axios from 'axios';
import { URL_API } from '../constant/api';

export const api = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
