import { useState } from "react";
import { MdClose } from "react-icons/md";
import { actualizarCurso } from "../../services/cursosService";

export default function ModalEditarCurso({ curso, onClose, onUpdated }) {
  const [nombre, setNombre] = useState(curso.nombre);
  const [nivel, setNivel] = useState(curso.nivel);
  const [descripcion, setDescripcion] = useState(curso.descripcion || "");

  const [error, setError] = useState("");

  const actualizar = async () => {
    if (!nombre.trim()) {
      setError("El nombre del curso es obligatorio.");
      return;
    }

    try {
      await actualizarCurso(curso.id, {
        nombre,
        nivel: Number(nivel),
        descripcion,
      });

      onUpdated();
      onClose();
    } catch (error) {
      console.error("Error actualizando curso:", error);
      setError("Hubo un error al actualizar el curso.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade">
      <div className="bg-white p-6 w-96 rounded-2xl shadow-xl relative">

        {/* Cerrar */}
        <button
          className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Editar Curso
        </h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Nombre */}
        <label className="block text-sm font-semibold mb-1">Nombre *</label>
        <input
          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del curso"
        />

        {/* Nivel */}
        <label className="block text-sm font-semibold mb-1">Nivel</label>
        <select
          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        {/* Descripción */}
        <label className="block text-sm font-semibold mb-1">Descripción</label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            onClick={actualizar}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
