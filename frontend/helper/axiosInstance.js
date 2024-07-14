// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      // Check if the user is logged in
      const storedSession = localStorage.getItem("session");
      
      if (storedSession) {
        try {
          const session = JSON.parse(storedSession);
          
          // If the token exists and the user is logged in, add it to the request headers
          if (session.accessToken && session.user) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
          } else {
            // If the user is not logged in, remove the authorization header
            delete config.headers.Authorization;
          }
        } catch (error) {
          console.error("Error parsing stored session:", error);
          delete config.headers.Authorization;
        }
      } else {
        delete config.headers.Authorization;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;