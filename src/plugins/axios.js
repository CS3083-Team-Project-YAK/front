import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // Use environment variable for API base URL
  timeout: 5000, // Set a timeout for requests
});

export default axiosInstance;
