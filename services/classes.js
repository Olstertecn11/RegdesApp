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

export const getClassById = async (id) => {
  return handleRequest(() => api.get(`/clase/${id}`));
}



export const getMyAssignedClass = (id_user) => {
  return handleRequest(() => api.get(`/asignacion-clase/usuario/${id_user}`));
}


export const assignedMeToClass = async (id_user, id_class, student = true) => {
  if (student) {
    return handleRequest(() => api.post(`/asignacion-clase`, { id_usuario: id_user, id_clase: id_class }));
  }
  return handleRequest(() => api.post(`/asignacion-clase`, { id_usuario: id_user, id_clase: id_class, es_estudiante: 0 }));
}

