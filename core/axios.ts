import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

const Axios = axios.create({
  baseURL: `http://localhost:5000`,
  headers: {
    Authorization: `Bearer ${cookies?.token}`,
  },
});

export { Axios };
