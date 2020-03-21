import Axios from "axios";

const baseURL = "http://127.0.0.1:8080/";

const repository = Axios.create({
  baseURL
});

export default repository;