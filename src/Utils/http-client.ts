import axios from "axios";

const BASE_URL = "http://202.157.189.96/api";
// const BASE_URL_MOCK = "https://jsonplaceholder.typicode.com";

export const httpClient = axios.create({
  baseURL: BASE_URL,
});
