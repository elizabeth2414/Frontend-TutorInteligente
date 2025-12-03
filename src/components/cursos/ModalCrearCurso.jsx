import { useState } from "react";
import { crearCurso } from "../../services/cursosService";

export default function ModalCrearCurso({ onClose, onCreated }) {
  const [nombre, setNombre] = useState("");
  const [nivel, setNivel] = useState(1);
  const [descripcion, setDescripcion] = useState("");

  const crear = async () => {
    try {
      await crearCurso({
        nombre,
        nivel: Number(nivel),
        descripcion,
      });

      onCreated();   // Recargar cursos
      onClose();     // Cerrar modal
    } catch (error) {
      console.error("Error creando curso:", error);
      alert("Hubo un error al crear el curso");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-96 rounded-2xl shadow-xl animate-fade">

        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Nuevo Curso
        </h2>

        {/* Nombre */}
        <label className="block mb-2 font-medium">Nombre del curso</label>
        <input
          className="w-full border p-2 rounded-lg mb-4 focus:outline-blue-600"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Lectura Nivel 1"
        />

        {/* Nivel */}
        <label className="block mb-2 font-medium">Nivel (1 - 6)</label>
        <select
          className="w-full border p-2 rounded-lg mb-4"
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
          className="w-full border p-2 rounded-lg mb-4"
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Crear
          </button>
        </div>

      </div>
    </div>
  );
}
