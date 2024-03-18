import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://marrymo.site/api',
  withCredentials: true,
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(async (config) => {

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});