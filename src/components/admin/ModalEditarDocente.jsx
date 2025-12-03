// src/components/admin/ModalEditarDocente.jsx
import { useState } from "react";
import { actualizarDocenteAdmin } from "../../services/adminService";
import Logger from "../../logs/logger";

export default function ModalEditarDocente({ docente, onClose, onUpdated }) {
  const [especialidad, setEspecialidad] = useState(docente.especialidad || "");
  const [gradoAcademico, setGradoAcademico] = useState(
    docente.grado_academico || ""
  );
  const [institucion, setInstitucion] = useState(docente.institucion || "");
  const [fechaContratacion, setFechaContratacion] = useState(
    docente.fecha_contratacion
      ? docente.fecha_contratacion.substring(0, 10)
      : ""
  );
  const [activo, setActivo] = useState(docente.activo);
  const [loading, setLoading] = useState(false);

  const actualizar = async () => {
    setLoading(true);
    try {
      await actualizarDocenteAdmin(docente.id, {
        especialidad,
        grado_academico: gradoAcademico,
        institucion,
        fecha_contratacion: fechaContratacion || null,
        activo,
      });

      Logger.info("Docente actualizado correctamente");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Error actualizando docente:", error);
      alert("Error al actualizar docente. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-lg rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Editar Docente
        </h2>

        <p className="mb-4 text-gray-700">
          <span className="font-semibold">
            {docente.usuario?.nombre} {docente.usuario?.apellido}
          </span>{" "}
          – {docente.usuario?.email}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              id="docente-edit-activo"
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
            <label htmlFor="docente-edit-activo" className="font-medium">
              Activo
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-60"
            onClick={actualizar}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}
