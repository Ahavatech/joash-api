export const CLOUDINARY_CONFIG = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
  apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
};

export const PROJECT_TYPES = {
  WEB_APP: 'Web Application',
  MOBILE_APP: 'Mobile Application',
  DESKTOP_APP: 'Desktop Application',
  OTHER: 'Other'
};

export const SKILL_CATEGORIES = {
  NOCODE: 'No-Code Tools',
  DESIGN: 'Design Tools',
  AI: 'AI Tools'
};

export const ERROR_MESSAGES = {
  GENERAL: 'Something went wrong. Please try again.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  INVALID_INPUT: 'Please fill in all required fields.',
  UNAUTHORIZED: 'You are not authorized to perform this action.'
};