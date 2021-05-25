import axios from 'axios';

const baseURL = 'http://localhost:5000';

export const getUser = (userId) => axios.get(`${baseURL}/users/${userId}`);

export const createUser = (userData) => axios.post(`${baseURL}/users/new`, userData);

export const getUserFiles = (userId) => axios.get(`${baseURL}/${userId}`);