import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const token = JSON.parse(userInfo).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- API Functions ---

// Auth
export const loginAdmin = (formData) => API.post('/auth/login', formData);
export const registerAdmin = (formData) => API.post('/auth/register', formData); // <-- ADD THIS LINE

// News
export const fetchNews = () => API.get('/news');
export const createNews = (newsData) => API.post('/news', newsData);

// Events
export const fetchEvents = () => API.get('/events');
export const createEvent = (eventData) => API.post('/events', eventData);

// Admissions
export const submitAdmission = (formData) => API.post('/admissions', formData);
export const getAdmissions = () => API.get('/admissions');

// Contact Messages
export const createContactMessage = (formData) => API.post('/contact', formData);
export const getContactMessages = () => API.get('/contact');
export const deleteContactMessage = (id) => API.delete(`/contact/${id}`);