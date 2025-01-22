import api from "./api";
import handleRequest from '../utils/handleRequest';

// export const createOrder = async (order) => {
//   return handleRequest(() => api.post('/orders', order));
// };

export const getChurchs = async () => {
  return handleRequest(() => api.get('/iglesia'));
};

