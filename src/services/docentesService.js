// src/services/docentesService.js

import axiosClient from "../api/axiosClient";
import Logger from "../logs/logger";

const BASE_URL = "/docentes";


// =======================================================
// 1. CREAR DOCENTE
// =======================================================
export const crearDocente = async (data) => {
  try {
    const res = await axiosClient.post(BASE_URL, data);
    Logger.api("POST /docentes", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error creando docente", error);
    throw error;
  }
};


// =======================================================
// 2. LISTAR DOCENTES
// =======================================================
export const listarDocentes = async (params = {}) => {
  try {
    const res = await axiosClient.get(BASE_URL, { params });
    Logger.api("GET /docentes", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error listando docentes", error);
    throw error;
  }
};


// =======================================================
// 3. OBTENER DOCENTE POR ID
// =======================================================
export const obtenerDocente = async (docente_id) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/${docente_id}`);
    Logger.api(`GET /docentes/${docente_id}`, res.data);
    return res.data;
  } catch (error) {
    Logger.error(`Error obteniendo docente ${docente_id}`, error);
    throw error;
  }
};


// =======================================================
// 4. ACTUALIZAR DOCENTE
// =======================================================
export const actualizarDocente = async (docente_id, data) => {
  try {
    const res = await axiosClient.put(`${BASE_URL}/${docente_id}`, data);
    Logger.api(`PUT /docentes/${docente_id}`, res.data);
    return res.data;
  } catch (error) {
    Logger.error(`Error actualizando docente ${docente_id}`, error);
    throw error;
  }
};


// =======================================================
// 5. ELIMINAR DOCENTE
// =======================================================
export const eliminarDocente = async (docente_id) => {
  try {
    const res = await axiosClient.delete(`${BASE_URL}/${docente_id}`);
    Logger.api(`DELETE /docentes/${docente_id}`, res.data);
    return res.data;
  } catch (error) {
    Logger.error(`Error eliminando docente ${docente_id}`, error);
    throw error;
  }
};


// =======================================================
// DASHBOARD — YA CONECTADOS AL BACKEND REAL
// =======================================================

export const getResumenDashboard = async () => {
  const res = await axiosClient.get("/docentes/dashboard/resumen");
  return res.data;
};

export const getProgresoMensual = async () => {
  const res = await axiosClient.get("/docentes/dashboard/progreso-mensual");
  return res.data;
};

export const getRendimientoCursos = async () => {
  const res = await axiosClient.get("/docentes/dashboard/rendimiento-cursos");
  return res.data;
};

export const getNiveles = async () => {
  const res = await axiosClient.get("/docentes/dashboard/niveles");
  return res.data;
};
