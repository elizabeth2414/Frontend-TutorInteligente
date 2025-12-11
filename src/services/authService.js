// src/services/authService.js

import axiosClient from "../api/axiosClient";
import Logger from "../logs/logger";

const AUTH_BASE = "/auth";

// =====================================
// 1. REGISTRO
// =====================================
export const registroUsuario = async (data) => {
  try {
    const res = await axiosClient.post(`${AUTH_BASE}/registro`, data);
    Logger.api("POST /auth/registro", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error en registro de usuario", error);
    throw error;
  }
};

// =====================================
// 2. LOGIN (CORREGIDO)
// =====================================
export const login = async (email, password) => {
  try {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const res = await axiosClient.post(`${AUTH_BASE}/login`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Guardamos token SOLO AQUÍ
    localStorage.setItem("token", res.data.access_token);

    Logger.api("POST /auth/login", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error en login", error);
    throw error;
  }
};

// =====================================
// 3. OBTENER USUARIO ACTUAL (CORREGIDO)
// =====================================
export const getUsuarioActual = async () => {
  try {
    const res = await axiosClient.get(`${AUTH_BASE}/me`);
    Logger.api("GET /auth/me", res.data);

    // Normalizar roles: puede venir roles[] o rol
    const roles = Array.isArray(res.data.roles)
      ? res.data.roles
      : res.data.rol
      ? [res.data.rol]
      : [];

    // Guardar en localStorage
    localStorage.setItem("roles", JSON.stringify(roles));

    return res.data;
  } catch (error) {
    Logger.error("Error obteniendo usuario actual", error);
    throw error;
  }
};

// =====================================
// 4. CAMBIO DE CONTRASEÑA
// =====================================
export const cambiarPassword = async (data) => {
  try {
    const res = await axiosClient.post(`${AUTH_BASE}/cambio-password`, data);
    Logger.api("POST /auth/cambio-password", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error cambiando password", error);
    throw error;
  }
};

// =====================================
// 5. RESET PASSWORD
// =====================================
export const solicitarResetPassword = async (email) => {
  try {
    const res = await axiosClient.post(`${AUTH_BASE}/reset-password`, { email });
    Logger.api("POST /auth/reset-password", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error solicitando reset password", error);
    throw error;
  }
};

// =====================================
// 6. CONFIRMAR RESET PASSWORD
// =====================================
export const confirmarResetPassword = async (token, nuevo_password) => {
  try {
    const res = await axiosClient.post(`${AUTH_BASE}/confirm-reset-password`, {
      token,
      nuevo_password,
    });
    Logger.api("POST /auth/confirm-reset-password", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error confirmando reset password", error);
    throw error;
  }
};

// =====================================
// 7. LOGOUT
// =====================================
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("roles");
  Logger.info("Usuario cerró sesión");
};

export const registrarPadre = async (data) => {
  try {
    const res = await axiosClient.post(`/auth/registro-padre`, data);
    Logger.api("POST /auth/registro-padre", res.data);
    return res.data;
  } catch (error) {
    Logger.error("Error al registrar padre", error);
    throw error;
  }
};
