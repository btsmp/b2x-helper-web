import axios from 'axios';

const BASE_URL = 'https://b2x-helper-api.onrender.com/';

export const api = axios.create({
  baseURL: BASE_URL
})
