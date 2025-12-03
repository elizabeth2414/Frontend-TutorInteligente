// src/services/padresService.js

import axiosClient from "../api/axiosClient";
import Logger from "../logs/logger";

const BASE_URL = "/padres";

// ============================================================
// 👨‍👧 CRUD de Padres
// ============================================================

export const crearPadre = async (data) => {
  try {
    const res = await axiosClient.post(`${BASE_URL}/`, data);
    Logger.api("POST /padres", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error al crear padre", error);
    throw error;
  }
};

export const listarPadres = async (skip = 0, limit = 100) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/`, {
      params: { skip, limit },
    });
    Logger.api("GET /padres", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error al listar padres", error);
    throw error;
  }
};

export const obtenerPadre = async (padreId) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/${padreId}`);
    Logger.api(`GET /padres/${padreId}`, res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error al obtener padre", error);
    throw error;
  }
};

export const actualizarPadre = async (padreId, data) => {
  try {
    const res = await axiosClient.put(`${BASE_URL}/${padreId}`, data);
    Logger.api(`PUT /padres/${padreId}`, res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error al actualizar padre", error);
    throw error;
  }
};

export const eliminarPadre = async (padreId) => {
  try {
    const res = await axiosClient.delete(`${BASE_URL}/${padreId}`);
    Logger.api(`DELETE /padres/${padreId}`, res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error al eliminar padre", error);
    throw error;
  }
};

// ============================================================
// 👨‍👧🔑 Accesos Padre → Estudiante
// ============================================================

export const crearAccesoPadre = async (data) => {
  try {
    const res = await axiosClient.post(`${BASE_URL}/acceso`, data);
    Logger.api("POST /padres/acceso", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error al crear acceso padre", error);
    throw error;
  }
};

export const listarAccesosPorEstudiante = async (estudianteId) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/acceso/${estudianteId}`);
    Logger.api(`GET /padres/acceso/${estudianteId}`, res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error al listar accesos de estudiante", error);
    throw error;
  }
};
