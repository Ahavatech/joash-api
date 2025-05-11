import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://joash-portfolio-api.onrender.com/api'
  : 'http://localhost:5000/api';
// Project APIs
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    await axios.delete(`${API_URL}/projects/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};

// Bio APIs
export const getBio = async () => {
  try {
    const response = await axios.get(`${API_URL}/bio`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBio = async (bioData) => {
  try {
    const response = await axios.put(`${API_URL}/bio`, bioData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Skills APIs
export const getSkills = async () => {
  try {
    const response = await axios.get(`${API_URL}/skills`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSkill = async (skillData) => {
  try {
    const response = await axios.post(`${API_URL}/skills`, skillData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSkill = async (id) => {
  try {
    await axios.delete(`${API_URL}/skills/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};
// ...existing code...

export const getAbout = async () => {
  try {
    const response = await axios.get(`${API_URL}/about`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAbout = async (aboutData) => {
  try {
    const response = await axios.put(`${API_URL}/about`, aboutData);
    return response.data;
  } catch (error) {
    throw error;
  }
};