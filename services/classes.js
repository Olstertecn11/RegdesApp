import api from "./api";
import handleRequest from '../utils/handleRequest';

// export const createOrder = async (order) => {
//   return handleRequest(() => api.post('/orders', order));
// };

export const getClasses = async () => {
  return handleRequest(() => api.get('/clase'));
};

export const getAsignedClasses = async () => {
  return handleRequest(() => api.get(`/asignaciones`));
}


export const _newClass = async (newClass) => {
  return handleRequest(() => api.post('/clase', newClass));
}

export const _newAsignedClass = async (newClass) => {
  return handleRequest(() => api.post('/asignaciones', newClass));
}
