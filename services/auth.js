import api from "./api";
import handleRequest from '../utils/handleRequest';

export const login = async (credentials) => {
  return handleRequest(() => api.post('/login', { usuario: credentials.username, contrasena: credentials.password, correo: 'fasdf' }));
}

export const _logout = async (token) => {
  // make post request to logout but passing Authorization header with token
  return handleRequest(() => api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } }));
}

export const getInfo = async (user) => {
  return handleRequest(() => api.get('/me', { usuario: user }));
}
