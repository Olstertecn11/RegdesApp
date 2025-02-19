import api from "./api";
import handleRequest from '../utils/handleRequest';
import { constants } from '../constants/env';


export const register = async ({ usuario, contrasena, correo }) => {
  const request_body = { usuario, contrasena, correo, id_privilegios: constants.privileges.user };
  console.log(request_body);
  return handleRequest(() => api.post('/usuarios', request_body));
};

