import axios from "axios";

const baseURL = "http://localhost:8080";

const tokenAxios = axios.create({
  baseURL,
});

tokenAxios.interceptors.request.use((config) => {
  const jwtTokent = localStorage.getItem("token");
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtTokent}`,
    },
  };
});

export default tokenAxios;
