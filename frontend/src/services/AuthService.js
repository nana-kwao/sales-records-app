import axios from 'axios';

const API_URL = '/api/auth/';

const register = (email, password) => {
  return axios.post(API_URL + 'register', { email, password });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('token');
};

export default {
  register,
  login,
  logout,
};
