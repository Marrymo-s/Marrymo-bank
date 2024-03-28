import axios from 'axios';
// 리액트 문법이 아니라서 .ts로 바꿔야함
export const axiosInstance = axios.create({
  baseURL: 'https://marrymo.site/api',
  withCredentials: true,
});

// 이미지 같은건 multipart라서 인터셉터는 처음에 한번 정의되고 다른데서 헤더를 고치면 지속돼서 상황별로 axios인스턴스를 여러개 만들어서 해야할수도 잇다

// 요청 인터셉터 추가
// 헤더담기
axiosInstance.interceptors.request.use(async (config) => {

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 응답 인터셉터 추가
// 에러처리 여기서
//
axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});