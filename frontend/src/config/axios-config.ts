import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_LINK_BACKEND_CLOUD}`,
});

export default instance;
