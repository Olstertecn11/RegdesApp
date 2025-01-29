import api from "./api";
import handleRequest from '../utils/handleRequest';

export const login = async (credentials) => {
  return handleRequest(() => api.post('/login', { usuario: credentials.username, contrasena: credentials.password, correo: 'fasdf' }));
}

export const logout = async (token) => {
  return handleRequest(() => api.post('/logout', { token }));
}

export const getInfo = async (user) => {
  return handleRequest(() => api.get('/me', { usuario: user }));
}
