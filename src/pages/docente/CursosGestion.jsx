import { useEffect, useState } from "react";

import {
  listarCursos,
  eliminarCurso,
} from "../../services/cursosService";

import ModalCrearCurso from "../../components/cursos/ModalCrearCurso";
import ModalEditarCurso from "../../components/cursos/ModalEditarCurso";

import {
  MdDelete,
  MdEdit,
  MdAdd,
  MdSchool,
} from "react-icons/md";

export default function CursosGestion() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalCrear, setModalCrear] = useState(false);
  const [cursoEditar, setCursoEditar] = useState(null);

  // ================================
  // CARGAR CURSOS DEL DOCENTE
  // ================================
  const cargarCursos = async () => {
    try {
      setLoading(true);
      const data = await listarCursos();
      setCursos(data);
    } catch (error) {
      console.error("Error cargando cursos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  // ================================
  // ELIMINAR CURSO
  // ================================
  const eliminar = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este curso?")) return;

    try {
      await eliminarCurso(id);
      cargarCursos();
    } catch (error) {
      console.error("Error eliminando curso:", error);
      alert("Hubo un error al eliminar el curso.");
    }
  };

  return (
    <div className="p-6 animate-fade">

      {/* ================================
          TÍTULO + BOTÓN CREAR
      ================================ */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
          <MdSchool size={32} />
          Gestión de Cursos
        </h1>

        <button
          onClick={() => setModalCrear(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          <MdAdd size={22} />
          Nuevo Curso
        </button>
      </div>

      {/* ================================
          TABLA DE CURSOS
      ================================ */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">

        {loading ? (
          <p className="text-gray-500 p-4">Cargando cursos...</p>
        ) : cursos.length === 0 ? (
          <p className="text-gray-500 p-4 italic">
            Aún no has creado ningún curso.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Nivel</th>
                  <th className="p-3">Código</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {cursos.map((curso) => (
                  <tr key={curso.id} className="border-b hover:bg-gray-100 transition">
                    <td className="p-3">{curso.nombre}</td>
                    <td className="p-3">{curso.nivel}</td>
                    <td className="p-3">{curso.codigo_acceso}</td>

                    <td className="p-3">
                      {curso.activo ? (
                        <span className="text-green-700 font-semibold">
                          Activo
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Inactivo
                        </span>
                      )}
                    </td>

                    <td className="p-3 flex justify-center gap-3">
                      {/* EDITAR */}
                      <button
                        onClick={() => setCursoEditar(curso)}
                        className="p-2 bg-yellow-400 text-black rounded-lg shadow hover:bg-yellow-500 transition"
                      >
                        <MdEdit size={20} />
                      </button>

                      {/* ELIMINAR */}
                      <button
                        onClick={() => eliminar(curso.id)}
                        className="p-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* ================================
          MODALES
      ================================ */}
      {modalCrear && (
        <ModalCrearCurso
          onClose={() => setModalCrear(false)}
          onCreated={cargarCursos}
        />
      )}

      {cursoEditar && (
        <ModalEditarCurso
          curso={cursoEditar}
          onClose={() => setCursoEditar(null)}
          onUpdated={cargarCursos}
        />
      )}

    </div>
  );
}
