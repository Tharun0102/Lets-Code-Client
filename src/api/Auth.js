import axios from 'axios';
import { createUser, getUser } from './index';
const baseURL = 'https://letscode-project.herokuapp.com';

//user
export const signup = (payload) => {
  return axios.post(
    `${baseURL}/users/new`, payload
  );
}

export const login = (payload) => axios.post(
  `${baseURL}/users/user/login`, payload
);

