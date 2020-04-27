import Axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;

const repository = Axios.create({
  baseURL
});

export default repository;