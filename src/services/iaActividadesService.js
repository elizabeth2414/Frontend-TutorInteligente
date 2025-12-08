// src/services/iaActividadesService.js

import axiosClient from "../api/axiosClient";
import Logger from "../logs/logger";

const BASE_URL = "/ia";

// ================================================================
// 1. GENERAR ACTIVIDADES POR IA PARA UNA LECTURA
// ================================================================
export const generarActividadesIA = async (contenidoId, opciones) => {
  try {
    const res = await axiosClient.post(
      `${BASE_URL}/lecturas/${contenidoId}/generar-actividades`,
      opciones
    );

    Logger.api(
      `POST /ia/lecturas/${contenidoId}/generar-actividades`,
      res.data
    );

    return res.data;
  } catch (error) {
    Logger.error("Error generando actividades IA", error);
    throw error;
  }
};

// ================================================================
// 2. OBTENER TODAS LAS ACTIVIDADES DE UNA LECTURA
// ================================================================
export const obtenerActividadesDeLectura = async (contenidoId) => {
  try {
    const res = await axiosClient.get(
      `${BASE_URL}/lecturas/${contenidoId}/actividades`
    );

    Logger.api(`GET /ia/lecturas/${contenidoId}/actividades`, res.data);

    return res.data;
  } catch (error) {
    Logger.error("Error obteniendo actividades de lectura", error);
    throw error;
  }
};

// ================================================================
// 3. OBTENER ACTIVIDAD INDIVIDUAL + PREGUNTAS
// ================================================================
export const obtenerActividadIA = async (actividadId) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/actividades/${actividadId}`);

    Logger.api(`GET /ia/actividades/${actividadId}`, res.data);

    return res.data;
  } catch (error) {
    Logger.error("Error obteniendo actividad IA", error);
    throw error;
  }
};
