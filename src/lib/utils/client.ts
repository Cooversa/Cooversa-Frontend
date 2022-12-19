import axios from "axios";
import {PUBLIC_API_BASE_URL} from "$env/static/public";

const client = axios.create({
    baseURL: PUBLIC_API_BASE_URL,
})

export default client;
