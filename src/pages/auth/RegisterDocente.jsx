import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RegisterDocente = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    especialidad: "",
    grado_academico: "",
    institucion: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          nombre: form.nombre,
          apellido: form.apellido,
        }),
      });

      if (!response.ok) throw new Error("Error al registrarse");

      navigate("/login");
    } catch (error) {
      setErrorMsg("No se pudo completar el registro.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">
      <Navbar />

      {/* CONTENIDO SIEMPRE DEBAJO DEL NAVBAR */}
      <main className="pt-28 flex-1 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-3xl w-full border border-white/40 relative overflow-hidden">

          {/* BURBUJAS DECORATIVAS */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-300/40 rounded-full blur-xl animate-pulse"></div>

          {/* IMAGEN */}
          <div className="flex justify-center mb-4 relative z-10">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/teacher-reading-book-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--docente-educacion-pack-people-illustrations-6512345.png"
              alt="Docente"
              className="w-36 drop-shadow-2xl animate-bounce-slow"
            />
          </div>

          <h2 className="text-4xl font-extrabold text-center text-purple-700 drop-shadow-md relative z-10">
            Registro de Docente 👩‍🏫✨
          </h2>

          <p className="text-center text-gray-700 mb-6 relative z-10">
            Crea tu cuenta para gestionar estudiantes y actividades educativas.
          </p>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4 text-center shadow-md animate-shake relative z-10">
              {errorMsg}
            </div>
          )}

          {/* FORMULARIO EN 2 COLUMNAS */}
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
                           focus:ring-4 focus:ring-purple-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="text-gray-700 font-semibold">Apellido</label>
              <input
                required
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Ingresa tu apellido"
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70
                           focus:ring-4 focus:ring-purple-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-700 font-semibold">Email institucional</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70 
                           focus:ring-4 focus:ring-blue-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-semibold">Contraseña</label>
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                minLength="6"
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70 
                           focus:ring-4 focus:ring-blue-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Especialidad */}
            <div>
              <label className="text-gray-700 font-semibold">Especialidad</label>
              <input
                type="text"
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
                placeholder="Lengua, Matemáticas..."
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70
                           focus:ring-4 focus:ring-green-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Grado Académico */}
            <div>
              <label className="text-gray-700 font-semibold">Grado académico</label>
              <input
                type="text"
                name="grado_academico"
                value={form.grado_academico}
                onChange={handleChange}
                placeholder="Lic., Mgs., PhD..."
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70
                           focus:ring-4 focus:ring-green-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Institución (OCUPA DOS COLUMNAS) */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-semibold">Institución</label>
              <input
                type="text"
                name="institucion"
                value={form.institucion}
                onChange={handleChange}
                placeholder="Unidad Educativa..."
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70
                           focus:ring-4 focus:ring-green-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Botón OCUPA DOS COLUMNAS */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-bold text-lg transition 
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-xl"
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

export default RegisterDocente;
