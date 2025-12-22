import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { registrarPadre } from "../../services/authService";

const RegisterPadre = () => {
  const navigate = useNavigate();
  const isMobile = Capacitor.isNativePlatform();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  // Validación de campos
  const validateField = (name, value) => {
    let msg = "";
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

    if (name === "nombre") {
      if (value.trim().length < 2) msg = "Ingresa un nombre válido.";
      else if (!soloLetras.test(value)) msg = "Solo se permiten letras.";
    }

    if (name === "apellido") {
      if (value.trim().length < 2) msg = "Ingresa un apellido válido.";
      else if (!soloLetras.test(value)) msg = "Solo se permiten letras.";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) msg = "Correo electrónico no válido.";
    }

    if (name === "password") {
      if (value.length < 6) msg = "Debe tener mínimo 6 caracteres.";
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  // Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  // Enviar formulario
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await registrarPadre(form);
      setSuccessMsg("Cuenta creada con éxito. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMsg("No se pudo completar el registro.");
    }

    setLoading(false);
  };

  // Bloquear si hay errores o campos vacíos
  const formInvalido =
    Object.values(errors).some((e) => e !== "") ||
    !form.nombre ||
    !form.apellido ||
    !form.email ||
    !form.password;

  // 📱 DISEÑO MÓVIL
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex flex-col relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="flex-1 flex flex-col justify-start px-6 py-8 relative z-10 safe-area overflow-y-auto">
          {/* Header con logo */}
          <div className="text-center mb-6 animate-fadeIn">
            <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <svg
                className="w-8 h-8 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
              Crear Cuenta
            </h2>
            <p className="text-white/95 text-sm">
              Regístrate como Padre / Tutor
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl animate-slideUp mb-6">
            {errorMsg && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-3 rounded-lg mb-4 flex items-start text-sm">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-3 rounded-lg mb-4 flex items-start text-sm">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="text-gray-700 font-semibold text-sm block mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={`w-full px-4 py-3 pl-11 rounded-2xl border-2 bg-gray-50 outline-none transition-all text-base ${
                      errors.nombre
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-pink-400 focus:bg-white"
                    }`}
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                {errors.nombre && (
                  <p className="text-red-600 text-xs mt-1 ml-1">{errors.nombre}</p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <label className="text-gray-700 font-semibold text-sm block mb-2">
                  Apellido
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder="Tu apellido"
                    className={`w-full px-4 py-3 pl-11 rounded-2xl border-2 bg-gray-50 outline-none transition-all text-base ${
                      errors.apellido
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-pink-400 focus:bg-white"
                    }`}
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                {errors.apellido && (
                  <p className="text-red-600 text-xs mt-1 ml-1">{errors.apellido}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700 font-semibold text-sm block mb-2">
                  Correo electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                    className={`w-full px-4 py-3 pl-11 rounded-2xl border-2 bg-gray-50 outline-none transition-all text-base ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-400 focus:bg-white"
                    }`}
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 ml-1">{errors.email}</p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <label className="text-gray-700 font-semibold text-sm block mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    minLength="6"
                    autoComplete="new-password"
                    className={`w-full px-4 py-3 rounded-2xl border-2 bg-gray-50 outline-none transition-all text-base pr-11 ${
                      errors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 focus:border-purple-400 focus:bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 ml-1">{errors.password}</p>
                )}
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={loading || formInvalido}
                className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all mt-6 ${
                  loading || formInvalido
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 active:scale-95"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registrando...
                  </span>
                ) : (
                  "Crear Cuenta"
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-gray-600 text-sm">
                ¿Ya tienes cuenta?{" "}
                <Link
                  to="/login"
                  className="text-purple-500 font-bold hover:underline"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-center text-white/80 text-xs pb-4">
            <p>v1.0.0 • ReadSmartIA © 2025</p>
          </div>
        </div>
      </div>
    );
  }

  // 🖥️ DISEÑO WEB (ORIGINAL)
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex-1 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/40 relative overflow-hidden">
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-pink-300/30 rounded-full blur-xl"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-300/30 rounded-full blur-xl"></div>

          <h2 className="text-4xl font-extrabold text-center text-blue-700 drop-shadow-md relative z-10">
            Registro de Padre / Tutor
          </h2>

          <p className="text-center text-gray-700 mb-6 relative z-10">
            Crea tu cuenta para seguir el progreso de tus hijos.
          </p>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4 text-center shadow-md">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded-lg mb-4 text-center shadow-md">
              {successMsg}
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
          >
            {/* Nombre */}
            <div>
              <label className="text-gray-700 font-semibold">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className={`w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border ${
                  errors.nombre ? "border-red-400" : "border-gray-300"
                } focus:ring-4 focus:ring-blue-400/40 outline-none shadow-inner`}
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Apellido */}
            <div>
              <label className="text-gray-700 font-semibold">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Ingresa tu apellido"
                className={`w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border ${
                  errors.apellido ? "border-red-400" : "border-gray-300"
                } focus:ring-4 focus:ring-blue-400/40 outline-none shadow-inner`}
              />
              {errors.apellido && (
                <p className="text-red-600 text-sm mt-1">{errors.apellido}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-semibold">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                className={`w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border ${
                  errors.email ? "border-red-400" : "border-gray-300"
                } focus:ring-4 focus:ring-purple-400/40 outline-none shadow-inner`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-semibold">Contraseña</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  minLength="6"
                  autoComplete="new-password"
                  className={`w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border ${
                    errors.password ? "border-red-400" : "border-gray-300"
                  } focus:ring-4 focus:ring-purple-400/40 outline-none shadow-inner pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
                >
                  {showPassword ? (
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path d="M3 3L21 21" stroke="#444" strokeWidth="2"></path>
                      <path
                        d="M6 6C3 8 2 12 2 12s3 6 10 6c2 0 3.5-.3 5-.9"
                        stroke="#444"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path
                        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                        stroke="#444"
                        strokeWidth="2"
                        fill="none"
                      ></path>
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#444"
                        strokeWidth="2"
                        fill="none"
                      ></circle>
                    </svg>
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Botón */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading || formInvalido}
                className={`w-full py-3 rounded-xl text-white font-bold text-lg transition ${
                  loading || formInvalido
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-xl"
                }`}
              >
                {loading ? "Registrando..." : "Crear Cuenta"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-gray-700 relative z-10">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="text-blue-600 font-bold hover:underline ml-1">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPadre;