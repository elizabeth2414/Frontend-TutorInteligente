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

  // ✔ Corrección: formatear fecha antes de enviarla
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

      const res = await vincularHijo(payload);

      setSuccessMsg("¡Hijo vinculado correctamente! 🎉");

      setTimeout(() => navigate("/padre/menu/hijos"), 1500);
    } catch (error) {
      console.error(error);

      // ✔ Corrección: fallback seguro si no existe error.detail
      const mensaje =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "No se pudo vincular al hijo. Verifica los datos ingresados.";

      setErrorMsg(mensaje);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col">
 

      <main className="pt-28 flex-1 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/40 relative overflow-hidden">

          {/* BURBUJAS DECORATIVAS */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-300/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-300/40 rounded-full blur-xl animate-pulse"></div>

          {/* ICONO */}
          <div className="flex justify-center mb-4 relative z-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2785/2785819.png"
              alt="Vincular hijo"
              className="w-32 drop-shadow-2xl animate-bounce-slow"
            />
          </div>

          {/* TÍTULO */}
          <h2 className="text-4-3xl font-extrabold text-center text-blue-700 drop-shadow-md relative z-10">
            Vincular a mi Hijo 👧👦
          </h2>

          <p className="text-center text-gray-700 mb-6 relative z-10">
            Ingresa los datos tal como fueron registrados por el docente.
          </p>

          {/* MENSAJES DE ERROR / EXITO */}
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

          {/* FORMULARIO */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
          >
            {/* Nombre */}
            <div>
              <label className="text-gray-700 font-semibold">Nombre del niño</label>
              <input
                required
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan"
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
                value={form.apellido}
                onChange={handleChange}
                placeholder="Ej: Pérez"
                className="w-full mt-1 px-4 py-3 rounded-xl border bg-white/70
                           focus:ring-4 focus:ring-blue-400/50 outline-none shadow-inner"
              />
            </div>

            {/* Fecha de nacimiento */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-semibold">Fecha de nacimiento</label>
              <input
                required
                type="date"
                name="fecha_nacimiento"
                value={form.fecha_nacimiento}
                onChange={handleChange}
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
                {loading ? "Vinculando..." : "Vincular Hijo"}
              </button>
            </div>
          </form>

          {/* Regresar */}
          <p className="mt-6 text-center text-gray-700 relative z-10 cursor-pointer">
            <span
              onClick={() => navigate("/padre/menu/hijos")}
              className="text-blue-600 font-bold hover:underline"
            >
              ← Regresar a Mis Hijos
            </span>
          </p>
        </div>
      </main>

    </div>
  );
}
