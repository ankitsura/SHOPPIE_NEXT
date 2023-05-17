import axios from 'axios';


export const API = axios.create({
  baseURL: 'http://localhost:5000'
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

