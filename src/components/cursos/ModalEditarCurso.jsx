import { useState } from "react";
import { actualizarCurso } from "../../services/cursosService";

export default function ModalEditarCurso({ curso, onClose, onUpdated }) {
  const [nombre, setNombre] = useState(curso.nombre);
  const [nivel, setNivel] = useState(curso.nivel);
  const [descripcion, setDescripcion] = useState(curso.descripcion || "");

  const actualizar = async () => {
    try {
      await actualizarCurso(curso.id, {
        nombre,
        nivel: Number(nivel),
        descripcion,
      });

      onUpdated();   // refrescar tabla
      onClose();     // cerrar modal

    } catch (error) {
      console.error("Error actualizando curso:", error);
      alert("Hubo un error al actualizar el curso.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-96 rounded-xl shadow-lg animate-fade">

        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Editar Curso
        </h2>

        {/* Nombre */}
        <label className="block mb-2 font-medium">Nombre</label>
        <input
          className="w-full border p-2 rounded mb-3 focus:outline-blue-600"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del curso"
        />

        {/* Nivel */}
        <label className="block mb-2 font-medium">Nivel</label>
        <select
          className="w-full border p-2 rounded mb-3"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        {/* Descripción */}
        <label className="block mb-2 font-medium">Descripción</label>
        <textarea
          className="w-full border p-2 rounded mb-4 focus:outline-blue-600"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del curso..."
        />

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={actualizar}
          >
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}
