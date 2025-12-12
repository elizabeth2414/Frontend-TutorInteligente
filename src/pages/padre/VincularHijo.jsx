import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vincularHijo } from "../../services/padresService";

export default function VincularHijo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const normalizarPayload = () => {
    const fechaIso = form.fecha_nacimiento
      ? new Date(form.fecha_nacimiento).toISOString().split("T")[0]
      : "";

    return {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      fecha_nacimiento: fechaIso,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const payload = normalizarPayload();
      await vincularHijo(payload);

      setSuccessMsg("Hijo vinculado correctamente.");
      setTimeout(() => navigate("/padre/menu/hijos"), 1500);
    } catch (error) {
      const mensaje =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "No se pudo vincular al hijo. Verifica los datos.";

      setErrorMsg(mensaje);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg border border-gray-200 p-8">

        {/* TÍTULO */}
        <h2 className="text-2xl font-bold text-blue-700 mb-1 text-center">
          Vincular Hijo
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Ingresa los datos registrados por el docente
        </p>

        {/* MENSAJES */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-sm">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-300 text-green-700 text-sm">
            {successMsg}
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              required
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Juan"
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              required
              value={form.apellido}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ej: Pérez"
            />
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              required
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Vinculando..." : "Vincular Hijo"}
          </button>
        </form>

        {/* REGRESAR */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/padre/menu/hijos")}
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Volver a Mis Hijos
          </button>
        </div>
      </div>
    </div>
  );
}
