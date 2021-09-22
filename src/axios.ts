import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://vidi-backend.herokuapp.com/",
  // withCredentials: true,
});
