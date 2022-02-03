import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_URL;

//user
export const getUser = (payload) => axios.post(
  `${baseURL}/users/user/get`, payload
);

export const getUserProjects = async (userData) => await axios.get(
  `${baseURL}/users/${userData.id}/projects`, { params: userData }
);

//projects
export const getProjectById = async (query) => await axios.get(
  `${baseURL}/users/${query.userId}/projects/${query.projectId}`, { params: query }
);

export const createProject = (data) => axios.post(
  `${baseURL}/users/${data.userId}/projects/new`, data
);

export const getProjectFiles = async (query) => await axios.get(
  `${baseURL}/users/${query.id}/projects/${query.projectId}/files`, { params: query }
);

export const toggleFavourite = async (query) => await axios.patch(
  `${baseURL}/users/${query.id}/projects/${query.projectId}/toggleFav`, query
);

export const deleteProject = (data) => axios.delete(
  `${baseURL}/users/${data.id}/projects/${data.projectId}`, { params: data }
);

//files
export const createFile = (data) => axios.post(
  `${baseURL}/users/${data.id}/projects/${data.projectId}/files/new`, data
);

export const getFile = (query) => axios.get(
  `${baseURL}/users/${query.id}/projects/${query.projectId}/files/${query._id}`, { params: query }
);

export const deleteFile = async (data) => {
  return await axios.delete(
    `${baseURL}/users/${data.id}/projects/${data.projectId}/files/${data.fileId}/delete`,
    { data: data }
  );
}
export const updateFile = (query) => axios.patch(
  `${baseURL}/users/${query.id}/projects/${query.projectId}/files/${query._id}`, query
);