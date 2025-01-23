import api from "./api";
import handleRequest from '../utils/handleRequest';


export const getLessons = async () => {
  return handleRequest(() => api.get('/leccion'));
};

