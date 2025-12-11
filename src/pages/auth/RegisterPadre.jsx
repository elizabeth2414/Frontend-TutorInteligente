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

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Manejar cambios de los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await registrarPadre(form);
      setSuccessMsg("Cuenta creada con éxito. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMsg("Error: No se pudo completar el registro.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col">
      <Navbar />

      <main className="pt-28 flex-1 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/40 relative overflow-hidden">

          {/* Decoraciones */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-pink-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-300/40 rounded-full blur-xl animate-pulse"></div>

          {/* Imagen */}
          <div className="flex justify-center mb-4 relative z-10">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/family-protection-3d-icon-6357184.png"
              alt="Padre"
              className="w-32 drop-shadow-2xl animate-bounce-slow"
            />
          </div>

          <h2 className="text-4xl font-extrabold text-center text-blue-700 drop-shadow-md relative z-10">
            Registro de Padre / Tutor 👨‍👩‍👧
          </h2>

          <p className="text-center text-gray-700 mb-6 relative z-10">
            Crea tu cuenta para seguir el progreso de tus hijos.
          </p>

          {/* Mensajes */}
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4 text-center shadow-md animate-shake">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded-lg mb-4 text-center shadow-md">
              {successMsg}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">

            {/* Nombre */}
            <div>
              <label className="text-gray-700 font-semibold">Nombre</label>
              <input
                required
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70 
                           focus:ring-4 focus:ring-blue-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="text-gray-700 font-semibold">Apellido</label>
              <input
                required
                type="text"
                name="apellido"
                value={form.apapellido}
                onChange={handleChange}
                placeholder="Ingresa tu apellido"
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70
                           focus:ring-4 focus:ring-blue-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-semibold">Correo electrónico</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70 
                           focus:ring-4 focus:ring-purple-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-semibold">Contraseña</label>
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                minLength="6"
                placeholder="********"
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70 
                           focus:ring-4 focus:ring-purple-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Botón */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-bold text-lg transition 
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-xl"
                  }`}
              >
                {loading ? "Registrando..." : "Crear Cuenta"}
              </button>
            </div>
          </form>

          {/* Enlace login */}
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
