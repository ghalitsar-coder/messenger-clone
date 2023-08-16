import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  timeout: 10000,
  baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // toast.error(
    //   `An error occurred! ${error.response.status} - ${error.response.statusText}`
    // );
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
