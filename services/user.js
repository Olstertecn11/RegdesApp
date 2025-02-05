import api from "./api";
import handleRequest from '../utils/handleRequest';

export const register = async ({ usuario, contrasena, correo }) => {
  console.log(usuario, contrasena, correo);
  return handleRequest(() => api.post('/usuarios'), { usuario, contrasena, correo });
};

