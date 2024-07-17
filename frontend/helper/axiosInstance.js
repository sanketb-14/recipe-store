
import axios from "axios";
// Adjust the import path as needed

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the user is logged in
    
    const user = JSON.parse(localStorage.getItem('session'));

    // If the token exists and the user is logged in, add it to the request headers
    if ( user /* Add condition to check if the user is logged in */) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    } else {
      // If the user is not logged in, remove the authorization header
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
