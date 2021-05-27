import axios from 'axios';

const baseURL = 'http://localhost:5000';

export const getUser = (query) => axios.get(
  `${baseURL}/users/${query.username}`, { params: query }
);


export const createUser = (userData) => axios.post(`${baseURL}/users/new`, userData);

export const getUserProjects = async (userData) => await axios.get(
  `${baseURL}/users/${userData.username}/projects`, {
  params: {
    "username": userData.username,
    "email": userData.email
  }
}
);