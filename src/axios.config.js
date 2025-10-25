import axios from 'axios';

// Set the base URL from environment variable
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

// Include credentials (cookies) in requests
axios.defaults.withCredentials = true;

export default axios;