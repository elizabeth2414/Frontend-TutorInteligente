// src/services/iaService.js

import axiosClient from "../api/axiosClient";
import Logger from "../logs/logger";

const BASE_URL = "/ia";

// ============================================================
// 📌 Analizar lectura con IA (Whisper + IA propia)
// ============================================================

/**
 * Sube un audio y devuelve el análisis:
 * - precisión
 * - errores
 * - retroalimentación IA
 * - ejercicios recomendados
 */
export const analizarLecturaIA = async (estudiante_id, contenido_id, audioFile) => {
  try {
    const formData = new FormData();
    formData.append("estudiante_id", estudiante_id);
    formData.append("contenido_id", contenido_id);
    formData.append("audio", audioFile);

    const res = await axiosClient.post(`${BASE_URL}/analizar-lectura`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    Logger.api("POST /ia/analizar-lectura", res.data);

    return res.data;
  } catch (error) {
    Logger.error("Error al analizar lectura IA", error);
    throw error;
  }
};
