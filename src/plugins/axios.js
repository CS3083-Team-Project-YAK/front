import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Point to the mock server
  timeout: 5000, // Set a timeout for requests
});

export default axiosInstance;
