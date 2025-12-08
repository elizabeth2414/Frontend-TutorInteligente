import { useState } from "react";
import { MdClose } from "react-icons/md";
import { crearCurso } from "../../services/cursosService";

export default function ModalCrearCurso({ onClose, onCreated }) {
  const [nombre, setNombre] = useState("");
  const [nivel, setNivel] = useState(1);
  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState("");

  const crear = async () => {
    if (!nombre.trim()) {
      setError("El nombre del curso es obligatorio.");
      return;
    }

    try {
      await crearCurso({
        nombre,
        nivel: Number(nivel),
        descripcion,
      });

      onCreated();
      onClose();
    } catch (error) {
      console.error("Error creando curso:", error);
      setError("Hubo un error al crear el curso.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade">
      <div className="bg-white p-6 w-96 rounded-2xl shadow-xl relative">

        {/* Botón cerrar */}
        <button
          className="absolute right-3 top-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Nuevo Curso
        </h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {/* Nombre */}
        <label className="block text-sm font-semibold mb-1">Nombre *</label>
        <input
          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Lectura Inicial"
        />

        {/* Nivel */}
        <label className="block text-sm font-semibold mb-1">Nivel (1 - 6)</label>
        <select
          className="w-full px-3 py-2 border rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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
          className="w-full px-3 py-2 border rounded-lg mb-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción breve del curso..."
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
            onClick={crear}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
