import axios from 'axios';

// axios 객체 생성
export default axios.create({
  baseURL: 'http://192.168.0.9:8082/',
  headers: {
    'Content-type': 'application/json',
  },
});