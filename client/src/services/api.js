import axios from 'axios';

// The API instance is now configured to make requests to your local server
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// This interceptor attaches the user's auth token to every request if it exists
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    // Parse the user info and get the token
    const token = JSON.parse(userInfo).token;
    // Set the Authorization header for the request
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --- API Functions ---

// Auth endpoints
export const loginAdmin = (formData) => API.post('/auth/login', formData);
export const registerAdmin = (formData) => API.post('/auth/register', formData);

// News endpoints
export const fetchNews = () => API.get('/news');
export const createNews = (newsData) => API.post('/news', newsData);
// Note: You will need a function to fetch a single news article
export const fetchNewsById = (id) => API.get(`/news/${id}`);


// Events endpoints
export const fetchEvents = () => API.get('/events');
export const createEvent = (eventData) => API.post('/events', eventData);

// Admissions endpoints
export const submitAdmission = (formData) => API.post('/admissions', formData);
export const getAdmissions = () => API.get('/admissions');

// Contact Messages endpoints
export const createContactMessage = (formData) => API.post('/contact', formData);
export const getContactMessages = () => API.get('/contact');
export const deleteContactMessage = (id) => API.delete(`/contact/${id}`);
