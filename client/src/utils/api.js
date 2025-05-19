import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Fallback data for development
const fallbackData = {
  about: {
    title: "About Me",
    content: "Default about content"
  },
  skills: [
    { name: "Figma", icon: "/figma-icon.svg", backgroundColor: "#ff4f1f" },
    { name: "Bubble.io", icon: "/bubble-icon.svg", backgroundColor: "#000000" },
    { name: "OpenAI", icon: "/openai-icon.svg", backgroundColor: "#10a37f" }
  ],
  projects: [],
  reviews: [
    {
      name: "Tevin Lowes",
      position: "CEO",
      company: "Holmes Inc.",
      review: "Securing your site is a must. And we got that taken care of, so you don't need to worry."
    }
  ]
};

export const getAbout = async () => {
  try {
    const response = await api.get('/about');
    return response.data;
  } catch (error) {
    console.warn('Using fallback data for About section:', error.message);
    return fallbackData.about;
  }
};

export const updateAbout = async (aboutData) => {
  try {
    const response = await api.put('/about', aboutData);
    return response.data;
  } catch (error) {
    console.error('Error updating about:', error);
    throw error;
  }
};

export const getSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.warn('Using fallback data for Skills section:', error.message);
    return fallbackData.skills;
  }
};

export const addSkill = async (skillData) => {
  try {
    const response = await api.post('/skills', skillData);
    return response.data;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
};

export const deleteSkill = async (skillId) => {
  try {
    const response = await api.delete(`/skills/${skillId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw error;
  }
};
export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.warn('Using fallback data for Projects section:', error.message);
    return fallbackData.projects;
  }
};

export const getReviews = async () => {
  try {
    const response = await api.get('/reviews/approved');
    return response.data;
  } catch (error) {
    console.warn('Using fallback data for Reviews section:', error.message);
    return fallbackData.reviews;
  }
};

// Add these new functions after the existing exports

export const getProfile = async () => {
  try {
    const response = await api.get('/admin/profile');
    return response.data;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append('profileImage', file);

  try {
    const response = await api.post('/admin/upload-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

export const getProfileImage = async () => {
  try {
    const profile = await getProfile();
    return { imageUrl: profile?.imageUrl || null };
  } catch (error) {
    console.error('Error getting profile image:', error);
    return { imageUrl: null };
  }
};


export const deleteProfileImage = async () => {
  try {
    const response = await api.delete('/admin/profile-image');
    return response.data;
  } catch (error) {
    console.error('Error deleting profile image:', error);
    throw error;
  }
};

// ...existing code...

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/admin/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const updateCredentials = async (credentials) => {
  try {
    const response = await api.post('/admin/update-credentials', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};