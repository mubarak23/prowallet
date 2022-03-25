import axios from 'axios'

const API_URL = '/api/user'


const registerAuth = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const API_URL_LOGIN = 'api/user/login'
const loginAuth = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};


const authService = {
  registerAuth,
  loginAuth
}

export default authService
