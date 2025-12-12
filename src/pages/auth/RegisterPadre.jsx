import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { registrarPadre } from "../../services/authService";

const RegisterPadre = () => {
  const navigate = useNavigate();

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

    // Solo letras y espacios
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
                  className={`w-full mt-1 px-4 py-3 rounded-xl bg-white/70 border ${
                    errors.password ? "border-red-400" : "border-gray-300"
                  } focus:ring-4 focus:ring-purple-400/40 outline-none shadow-inner pr-12`}
                />

                {/* Ojito sin iconos externos */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
                >
                  {showPassword ? (
                    // ojo cerrado
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path d="M3 3L21 21" stroke="#444" strokeWidth="2"></path>
                      <path
                        d="M6 6C3 8 2 12 2 12s3 6 10 6c2 0 3.5-.3 5-.9"
                        stroke="#444"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  ) : (
                    // ojo abierto
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
