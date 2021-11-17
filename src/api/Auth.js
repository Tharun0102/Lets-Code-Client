import axios from 'axios';
import { createUser, getUser } from './index';

// const baseURL = 'https://localhost:5000/';
const baseURL = 'https://lets-code-server.herokuapp.com';

//user
export const signup = (payload) => {
  return axios.post(
    `${baseURL}/users/new`, payload
  );
}

export const login = (payload) => axios.post(
  `${baseURL}/users/user/login`, payload
);

