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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          nombre: form.nombre,
          apellido: form.apellido,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrarse");
      }

      navigate("/login");
    } catch (error) {
      setErrorMsg("No se pudo completar el registro.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl max-w-lg w-full">

          {/* Imagen */}
          <div className="flex justify-center mb-4">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/teacher-reading-book-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--docente-educacion-pack-people-illustrations-6512345.png"
              alt="Docente"
              className="w-32 drop-shadow-lg"
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
            Registro de Docente 👩‍🏫✨
          </h2>

          <p className="text-center text-gray-700 mb-6">
            Crea tu cuenta para gestionar estudiantes y actividades educativas.
          </p>

          {/* Error */}
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4 text-center">
              {errorMsg}
            </div>
          )}

          {/* FORMULARIO */}
          <form onSubmit={handleRegister} className="space-y-5">

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
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
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
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-400 outline-none"
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
                autoComplete="off"
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
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
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
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
                placeholder="Lengua, Matemáticas, Ciencias..."
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-300 outline-none"
              />
            </div>

            {/* Grado Académico */}
            <div>
              <label className="text-gray-700 font-semibold">Grado Académico</label>
              <input
                type="text"
                name="grado_academico"
                value={form.grado_academico}
                onChange={handleChange}
                placeholder="Lic., Mgs., PhD..."
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-300 outline-none"
              />
            </div>

            {/* Institución */}
            <div>
              <label className="text-gray-700 font-semibold">Institución</label>
              <input
                type="text"
                name="institucion"
                value={form.institucion}
                onChange={handleChange}
                placeholder="Unidad Educativa..."
                className="w-full mt-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-300 outline-none"
              />
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-bold text-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-lg"
              }`}
            >
              {loading ? "Registrando..." : "Crear Cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-700">
            ¿Ya tienes una cuenta?
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline ml-1"
            >
              Inicia Sesión aquí
            </Link>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default RegisterDocente;
