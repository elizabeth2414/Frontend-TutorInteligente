// src/components/admin/ModalCrearDocente.jsx
import { useState } from "react";
import { crearDocenteAdmin } from "../../services/adminService";
import Logger from "../../logs/logger";

export default function ModalCrearDocente({ onClose, onCreated }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [gradoAcademico, setGradoAcademico] = useState("");
  const [institucion, setInstitucion] = useState("");
  const [fechaContratacion, setFechaContratacion] = useState("");
  const [activo, setActivo] = useState(true);
  const [loading, setLoading] = useState(false);

  const crear = async () => {
    if (!nombre || !apellido || !email || !password) {
      alert("Nombre, apellido, email y contraseña son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      await crearDocenteAdmin({
        nombre,
        apellido,
        email,
        password,
        especialidad,
        grado_academico: gradoAcademico,
        institucion,
        fecha_contratacion: fechaContratacion || null,
        activo,
      });

      Logger.info("Docente creado correctamente");
      onCreated();
      onClose();
    } catch (error) {
      console.error("Error creando docente:", error);
      alert("Error al crear docente. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-lg rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Nuevo Docente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              className="w-full border p-2 rounded-lg"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          {/* Apellido */}
          <div>
            <label className="block mb-1 font-medium">Apellido</label>
            <input
              className="w-full border p-2 rounded-lg"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full border p-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Especialidad */}
          <div>
            <label className="block mb-1 font-medium">Especialidad</label>
            <input
              className="w-full border p-2 rounded-lg"
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
            />
          </div>

          {/* Grado académico */}
          <div>
            <label className="block mb-1 font-medium">Grado académico</label>
            <input
              className="w-full border p-2 rounded-lg"
              value={gradoAcademico}
              onChange={(e) => setGradoAcademico(e.target.value)}
            />
          </div>

          {/* Institución */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Institución</label>
            <input
              className="w-full border p-2 rounded-lg"
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
            />
          </div>

          {/* Fecha contratación */}
          <div>
            <label className="block mb-1 font-medium">
              Fecha de contratación
            </label>
            <input
              type="date"
              className="w-full border p-2 rounded-lg"
              value={fechaContratacion}
              onChange={(e) => setFechaContratacion(e.target.value)}
            />
          </div>

          {/* Activo */}
          <div className="flex items-center gap-2 mt-6">
            <input
              id="docente-activo"
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
            <label htmlFor="docente-activo" className="font-medium">
              Activo
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            onClick={crear}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
