import axios from 'axios';

const baseURL = 'http://localhost:5000';

//user
export const getUser = (query) => axios.get(
  `${baseURL}/users/${query.name}`, { params: query }
);

export const createUser = (data) => axios.post(
  `${baseURL}/users/new`, data
);

export const getUserProjects = async (userData) => await axios.get(
  `${baseURL}/users/${userData.id}/projects`, { params: userData }
);

//projects
export const findProjectById = async (query) => await axios.get(
  `${baseURL}/users/${query.userId}/projects/${query.projectId}`, { params: query }
);

export const createProject = (data) => axios.post(
  `${baseURL}/users/${data.userId}/projects/new`, data
);

export const getProjectFiles = async (query) => await axios.get(
  `${baseURL}/users/${query.id}/projects/${query.projectId}/files`, { params: query }
);

export const deleteProject = (data) => axios.delete(
  `${baseURL}/users/${data.id}/projects/${data.projectId}`, { params: data }
);

//files
