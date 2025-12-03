// src/services/adminService.js
import axiosClient from "../api/axiosClient";
import Logger from "../logs/logger";

const BASE_URL = "/admin";

// LISTAR DOCENTES
export const listarDocentesAdmin = async () => {
  const res = await axiosClient.get(`${BASE_URL}/docentes`);
  Logger.api("GET /admin/docentes", res.data);
  return res.data;
};

// CREAR DOCENTE (admin)
export const crearDocenteAdmin = async (data) => {
  const res = await axiosClient.post(`${BASE_URL}/docentes`, data);
  Logger.api("POST /admin/docentes", res.data);
  return res.data;
};

// OBTENER DOCENTE
export const obtenerDocenteAdmin = async (id) => {
  const res = await axiosClient.get(`${BASE_URL}/docentes/${id}`);
  Logger.api(`GET /admin/docentes/${id}`, res.data);
  return res.data;
};

// ACTUALIZAR DOCENTE
export const actualizarDocenteAdmin = async (id, data) => {
  const res = await axiosClient.put(`${BASE_URL}/docentes/${id}`, data);
  Logger.api(`PUT /admin/docentes/${id}`, res.data);
  return res.data;
};

// DESACTIVAR DOCENTE
export const desactivarDocenteAdmin = async (id) => {
  const res = await axiosClient.delete(`${BASE_URL}/docentes/${id}`);
  Logger.api(`DELETE /admin/docentes/${id}`, res.data);
  return res.data;
};
