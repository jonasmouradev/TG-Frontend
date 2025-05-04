import axios from "axios";
import { links } from "../utils/links";

export const api = axios.create({
  baseURL: links.api,
});
