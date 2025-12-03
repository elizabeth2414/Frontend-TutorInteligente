import { useEffect, useState } from "react";

import {
  listarCursos,
  eliminarCurso,
} from "../../services/cursosService";

import ModalCrearCurso from "../../components/cursos/ModalCrearCurso";
import ModalEditarCurso from "../../components/cursos/ModalEditarCurso";

import { MdDelete, MdEdit, MdAdd } from "react-icons/md";

export default function CursosGestion() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalCrear, setModalCrear] = useState(false);
  const [cursoEditar, setCursoEditar] = useState(null);

  // =====================================
  // CARGAR CURSOS DEL DOCENTE
  // =====================================
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

  // =====================================
  // ELIMINAR CURSO
  // =====================================
  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este curso?")) return;

    try {
      await eliminarCurso(id);
      cargarCursos();
    } catch (error) {
      console.error("Error eliminando curso:", error);
      alert("Hubo un error al eliminar el curso");
    }
  };

  return (
    <div className="p-6 animate-fade">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Gestionar Cursos
        </h1>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
          onClick={() => setModalCrear(true)}
        >
          <MdAdd /> Nuevo Curso
        </button>
      </div>

      {/* ======================= */}
      {/*   TABLA DE CURSOS       */}
      {/* ======================= */}
      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : (
        <table className="w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Nivel</th>
              <th className="p-3 text-left">Código</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{curso.nombre}</td>
                <td className="p-3">{curso.nivel}</td>
                <td className="p-3">{curso.codigo_acceso}</td>

                <td className="p-3">
                  {curso.activo ? (
                    <span className="text-green-700 font-bold">Activo</span>
                  ) : (
                    <span className="text-red-600 font-bold">Inactivo</span>
                  )}
                </td>

                <td className="p-3 flex gap-2">
                  {/* EDITAR */}
                  <button
                    onClick={() => setCursoEditar(curso)}
                    className="bg-yellow-400 text-black p-2 rounded shadow hover:bg-yellow-500"
                  >
                    <MdEdit />
                  </button>

                  {/* ELIMINAR */}
                  <button
                    onClick={() => eliminar(curso.id)}
                    className="bg-red-600 text-white p-2 rounded shadow hover:bg-red-700"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL CREAR CURSO */}
      {modalCrear && (
        <ModalCrearCurso
          onClose={() => setModalCrear(false)}
          onCreated={cargarCursos}
        />
      )}

      {/* MODAL EDITAR CURSO */}
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
