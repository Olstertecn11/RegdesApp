
import api from "./api";
import handleRequest from '../utils/handleRequest';


export const get_assistence_from_class = async (id_class) => {
  return handleRequest(() => api.get(`/asistencia-clase/${id_class}`));
};

export const create_assistence = async (id_clase, status = 0) => {
  // fecha is current date but in mysql format date
  const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
  return handleRequest(() => api.post(`/asistencia-clase`, { id_clase, fecha, status }));
}


export const create_student_assistence = async (id_asistencia, id_estudiante, status) => {
  return handleRequest(() => api.post(`/asistencia-estudiante`, { id_asistencia, id_estudiante, status }));
}


export const get_student_assistence = async (id_class) => {
  return handleRequest(() => api.get(`/asistencia-estudiante/${id_class}`));
}


export const get_assistence_list_from_class = async (id_class, fecha) => {
  const url = `/asistencia-clase/${id_class}/${fecha}`;
  console.log(url);
  return handleRequest(() => api.get(`/asistencia-clase/${id_class}/${fecha}`));
}
