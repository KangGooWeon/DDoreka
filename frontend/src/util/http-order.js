import axios from 'axios';

// axios 객체 생성
export default axios.create({
  baseURL: 'http://k4d104.p.ssafy.io:8084/',
  headers: {
    'Content-type': 'application/json',
  },
});
